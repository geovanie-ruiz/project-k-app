'use client';

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { MarkdownTransformer } from '../markdownTransformer';
import { PrettyIconNode } from './nodes/PrettyIconNode';
import PrettyIcons from './plugin';

const PrettyIconsClientFeature = createClientFeature({
  markdownTransformers: [MarkdownTransformer],
  nodes: [PrettyIconNode],
  plugins: [{ Component: PrettyIcons, position: 'normal' }],
});

export default PrettyIconsClientFeature;
