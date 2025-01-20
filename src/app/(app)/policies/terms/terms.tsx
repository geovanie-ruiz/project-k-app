import Link from 'next/link';

export default async function Terms() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold">
          Terms and Conditions for 2Runes.gg
        </h1>
        <p className="text-sm mb-4">Last updated on December 14, 2024.</p>
        <p className="mb-4">
          Welcome to 2Runes.gg. These Terms and Conditions govern your use of
          our website located at{' '}
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-500 hover:underline"
            prefetch={false}
          >
            https://2Runes.gg
          </Link>{' '}
          (the &quot;Site&quot;) and any services, features, or content we offer
          (collectively, the &quot;Services&quot;). By accessing or using our
          Site, you agree to comply with and be bound by these Terms. If you do
          not agree with any part of these Terms, you must not use our Site or
          Services.
        </p>
        <h2 className="text-4xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our Site, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and any other
          policies or guidelines that may be posted on our Site from time to
          time.
        </p>
        <h2 className="text-4xl font-bold mb-4">2. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms at any time. Any changes
          will be effective immediately upon posting on the Site. Your continued
          use of the Site following the posting of changes constitutes your
          acceptance of such changes.
        </p>
        <h2 className="text-4xl font-bold mb-4">3. Use of the Site</h2>
        <p className="mb-4">
          You agree to use the Site and Services only for lawful purposes and in
          accordance with these Terms. You agree not to use the Site:
        </p>
        <ul className="space-y-1 list-disc list-inside mb-8">
          <li>
            In any way that violates any applicable federal, state, local, or
            international law or regulation.
          </li>
          <li>
            To exploit, harm, or attempt to exploit or harm minors in any way by
            exposing them to inappropriate content or otherwise.
          </li>
          <li>
            To transmit, or procure the sending of, any advertising or
            promotional material, including any &quot;junk mail,&quot;
            &quot;chain letter,&quot; &quot;spam,&quot; or any other similar
            solicitation.
          </li>
        </ul>
        <h2 className="text-4xl font-bold mb-4">4. User Accounts</h2>
        <p className="mb-4">
          To access certain features of our Site, you may be required to create
          an account. You agree to provide accurate, current, and complete
          information during the registration process and to update such
          information to keep it accurate, current, and complete. You are
          responsible for maintaining the confidentiality of your account and
          password and for restricting access to your computer or device.
        </p>
        <h2 className="text-4xl font-bold mb-4">5. Intellectual Property</h2>
        <p className="mb-4">
          2Runes.gg was created under Riot Games&apos; &quot;Legal Jibber
          Jabber&quot; policy using assets owned by Riot Games. Riot Games does
          not endorse or sponsor this project. Riot Games®, Project K, set
          names and images, logos, names and all associated marks are trademarks
          of Riot Games. All other trademarks are the property of the respective
          trademark owners.
        </p>
        <p className="mb-4">
          All original content on the Site, including text, graphics, logos,
          icons, images, and software, is the property of 2Runes.gg or its
          licensors and is protected by copyright, trademark, and other
          intellectual property laws. You may not reproduce, distribute, modify,
          create derivative works of, publicly display, publicly perform,
          republish, download, store, or transmit any of the material on our
          Site, except as expressly permitted by these Terms and Conditions.
        </p>
        <h2 className="text-4xl font-bold mb-4">6. Limitations of Liability</h2>
        <p className="mb-4">
          2Runes.gg and all information, content, materials, products and
          services are provided on an “as is” and “as available” basis unless
          otherwise specified in writing. 2Runes.gg makes no representations or
          warranties of any kind, expressed or implied, as to the performance or
          operation of services or the information, content, materials or
          products made available to you by using the site. You expressly agree
          that your use of 2Runes.gg is at your sole risk. To the maximum extent
          allowed by relevant and applicable law, 2Runes.gg disclaims all
          warranties. Specifically, 2Runes.gg does not warrant that the
          2Runes.gg services, servers or electronic communications are free of
          viruses or other harmful components. Furthermore, 2Runes.gg will not
          be liable for any damages or loss caused by the use of 2Runes.gg or
          from its information, content, materials or products.
        </p>
        <h2 className="text-4xl font-bold mb-4">7. Termination</h2>
        <p className="mb-4">
          2Runes.gg may terminate or suspend your right to use the Site, any
          services provided on the Site, at any time. Your right to use the
          Site, any services provided on the Site shall terminate immediately
          and automatically if you should breach any of these Terms and
          Conditions. You agree that the following actions, among others and
          whether or not set forth herein, shall constitute a breach of these
          Terms and Conditions:
        </p>
        <ul className="space-y-1 list-disc list-inside mb-4">
          <li>Create a false identity for the purpose of misleading others</li>
          <li>You are distributing harmful computer code</li>
          <li>
            Using the Site for any purpose in violation of state, local,
            national, or international laws
          </li>
          <li>
            Taking any action that interferes or may interfere with the use or
            functionality of the Site including but not limited to spamming,
            flooding, or overloading 2Runes.gg&apos;s servers
          </li>
          <li>
            Using material that is unlawful, abusive, defamatory, threatening,
            obscene, harassing, hateful, or embarrassing to any other person
          </li>
          <li>
            2Runes.gg has the right, but not the obligation, to terminate your
            account if we have reason to believe that your account is being
            misused or that your login information is compromise
          </li>
          <li>
            Using material that infringes on the intellectual property rights of
            others or on the privacy or publicity rights of others
          </li>
        </ul>
      </div>
    </div>
  );
}
