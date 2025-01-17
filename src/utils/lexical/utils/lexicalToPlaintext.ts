'use server';

import {
  $getRoot,
  SerializedEditorState,
} from '@payloadcms/richtext-lexical/lexical';

import { PrettyIconsFeature } from '@/utils/lexical/features/pretty-icons/server';
import { PrettyKeywordsFeature } from '@/utils/lexical/features/pretty-keywords/server';
import {
  defaultEditorConfig,
  defaultEditorFeatures,
  FixedToolbarFeature,
  getEnabledNodes,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical';
import { createHeadlessEditor } from '@payloadcms/richtext-lexical/lexical/headless';
import { SanitizedConfig } from 'payload';

export async function lexicalToPlaintext(
  lexicalState: SerializedEditorState,
  payloadConfig: SanitizedConfig
): Promise<string> {
  const editorConfig = defaultEditorConfig;
  editorConfig.features = [
    PrettyIconsFeature(),
    ...defaultEditorFeatures,
    FixedToolbarFeature(),
    PrettyKeywordsFeature(),
  ];
  console.log(editorConfig.features[0]);

  const sanitizedConfig = await sanitizeServerEditorConfig(
    editorConfig,
    payloadConfig
  );

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: sanitizedConfig,
    }),
  });

  try {
    headlessEditor.update(
      () => {
        headlessEditor.setEditorState(
          headlessEditor.parseEditorState(lexicalState)
        );
      },
      { discrete: true }
    );
  } catch (e) {
    console.error('Error parsing editor state', e);
    return '';
  }

  return (
    headlessEditor.getEditorState().read(() => {
      return $getRoot().getTextContent();
    }) || ''
  );
}
