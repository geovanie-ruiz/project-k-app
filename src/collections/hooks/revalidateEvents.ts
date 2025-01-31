import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

import { revalidateTag } from 'next/cache';

export const revalidateEvents: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.approved) {
      payload.logger.info('Revalidating events');
      revalidateTag('events');
    }

    if (previousDoc.approved && !doc.approved) {
      payload.logger.info('Revalidating events');
      revalidateTag('events');
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('events');
  }
  return doc;
};
