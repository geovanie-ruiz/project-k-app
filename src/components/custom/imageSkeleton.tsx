import { Skeleton } from '@/components/ui/skeleton';

interface ImageSkeletonProps {
  width: string;
  height: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ width, height }) => {
  return <Skeleton className="rounded-t-lg" style={{ width, height }} />;
};

export default ImageSkeleton;
