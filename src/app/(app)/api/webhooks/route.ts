import { selectClient } from '@/utils/supabase/selectClient';
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // If user is created in Clerk, create them in Payload
  // Set default role in Payload, and update public metadata in Clerk
  if (evt.type === 'user.created') {
    const supabase = await selectClient({ serviceConnection: true });

    const { id, username } = evt.data;
    const email = evt.data.email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id
    )?.email_address;

    const { error } = await supabase
      .from('users')
      .insert({ clerk_id: id, email, username, role: 'user' });

    if (error) {
      console.error('Error: Could not create user:', error);
      return new Response('Error: Could not create user', {
        status: 500,
      });
    }

    // Set to default role
    const client = await clerkClient();
    await client.users.updateUserMetadata(id, {
      publicMetadata: {
        role: 'user',
      },
    });
  }

  // If user is deleted in Clerk, delete them in Payload
  if (evt.type === 'user.deleted') {
    const { id, deleted } = evt.data;

    if (deleted && id) {
      const supabase = await selectClient({ serviceConnection: true });

      const { error } = await supabase
        .from('users')
        .delete()
        .eq('clerk_id', id);

      if (error) {
        console.error('Error: Could not delete user:', error);
        return new Response('Error: Could not delete user', {
          status: 500,
        });
      }
    }
  }

  // If user is updated in Clerk, update them in Payload
  if (evt.type === 'user.updated') {
    const supabase = await selectClient({ serviceConnection: true });

    const { id, username } = evt.data;
    const email = evt.data.email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id
    )?.email_address;

    const { error } = await supabase
      .from('users')
      .update({ email, username })
      .eq('clerk_id', id);

    if (error) {
      console.error('Error: Could not update user:', error);
      return new Response('Error: Could not update user', {
        status: 500,
      });
    }
  }

  return new Response('Webhook received', { status: 200 });
}
