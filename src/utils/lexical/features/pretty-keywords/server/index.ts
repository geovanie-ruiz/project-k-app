import { createServerFeature } from '@payloadcms/richtext-lexical';
import { MarkdownTransformer } from '../markdownTransformer';

export const PrettyKeywordsFeature = createServerFeature({
  feature: {
    ClientFeature: '@/utils/lexical/features/pretty-keywords/client',
    markdownTransformers: [MarkdownTransformer],
  },
  key: 'prettyKeywords',
});
