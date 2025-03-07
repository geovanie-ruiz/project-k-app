import { Badge } from '@/components/ui/badge';

export const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <Badge key={index} variant="secondary">
        {tag}
      </Badge>
    ))}
  </div>
);
