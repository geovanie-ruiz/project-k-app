interface CloudflareLoaderProps {
  src: string;
  variant: string;
}

export default function cloudflareLoader({ src }: CloudflareLoaderProps) {
  return `https://imagedelivery.net/v8gJdXICPv6MCqZxAubenw/${src}`;
}
