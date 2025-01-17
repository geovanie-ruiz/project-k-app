import { createNode, createServerFeature } from '@payloadcms/richtext-lexical';
import { PrettyIconNode } from '../client/nodes/PrettyIconNode';
import { MarkdownTransformer } from '../markdownTransformer';

export const PrettyIconsFeature = createServerFeature({
  feature: {
    ClientFeature: '@/utils/lexical/features/pretty-icons/client',
    markdownTransformers: [MarkdownTransformer],
    nodes: [
      createNode({
        node: PrettyIconNode,
      }),
    ],
  },
  key: 'prettyIcons',
});
