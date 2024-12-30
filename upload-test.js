import Cloudflare from 'cloudflare';

const client = new Cloudflare({
  apiEmail: 'geovanie.ruiz@gmail.com',
  apiToken: 'M1qkmBF8KVS79mLAfnm5VGqrMQpikvIAIQonfRnA',
});

const images = await client.images.v1
  .list({
    account_id: 'eb129f5b34f7ac4d58c54663ffcf54d9',
    page: 1,
    per_page: 10,
  })
  .catch((err) => {
    console.log(err);
  });

console.log(images);
