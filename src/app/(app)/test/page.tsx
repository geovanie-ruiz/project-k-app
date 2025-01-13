import CardText from '@/components/custom/cardText';
import config from '@/payload.config';
import { getPayload } from 'payload';

export default async function Test() {
  const payload = await getPayload({ config });
  const cards = await payload.find({
    collection: 'cards',
    depth: 2,
    limit: -1,
  });

  return (
    <div className="grid grid-flow-dense grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.docs.map((card) => (
        <div key={card.id} className="flex p-4 ">
          <CardText
            cardText={card.abilities}
            keywords={card.keywords}
            showReminders={true}
          />
        </div>
      ))}
    </div>
  );
}
