'use client';

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { MarkdownTransformer } from '../markdownTransformer';
import { PrettyKeywordNode } from './nodes/PrettyKeywordNode';
import { PrettyKeywordPlugin } from './plugin';

const PrettyKeywordsClientFeature = createClientFeature({
  markdownTransformers: [MarkdownTransformer],
  nodes: [PrettyKeywordNode],
  plugins: [{ Component: PrettyKeywordPlugin, position: 'normal' }],
});

export default PrettyKeywordsClientFeature;
