import { createServerFeature } from '@payloadcms/richtext-lexical';
import { MarkdownTransformer } from '../markdownTransformer';

export const PrettyIconsFeature = createServerFeature({
  feature: {
    ClientFeature: '@/utils/lexical/features/pretty-icons/client',
    markdownTransformers: [MarkdownTransformer],
  },
  key: 'prettyIcons',
});
