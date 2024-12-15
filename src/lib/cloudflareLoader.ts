interface CloudflareLoaderProps {
  src: string;
  width: number;
  quality: number;
}

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({ src, width, quality = 75 }: CloudflareLoaderProps) {
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  params.push('format=auto');
  const paramsString = params.join(",");
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
