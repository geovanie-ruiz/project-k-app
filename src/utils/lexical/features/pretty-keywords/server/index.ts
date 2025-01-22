import { createNode, createServerFeature } from '@payloadcms/richtext-lexical';
import { PrettyKeywordNode } from '../client/nodes/PrettyKeywordNode';
import { MarkdownTransformer } from '../markdownTransformer';

export const PrettyKeywordsFeature = createServerFeature({
  feature: {
    ClientFeature: '@/utils/lexical/features/pretty-keywords/client',
    markdownTransformers: [MarkdownTransformer],
    nodes: [
      createNode({
        node: PrettyKeywordNode,
      }),
    ],
  },
  key: 'prettyKeywords',
});
