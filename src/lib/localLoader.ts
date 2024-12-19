interface localLoaderProps {
  src: string;
}

export default function localLoader({ src }: localLoaderProps) {
  return src;
}
