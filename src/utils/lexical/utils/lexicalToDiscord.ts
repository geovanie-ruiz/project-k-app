'use server';

import {
  $getRoot,
  $isElementNode,
  SerializedEditorState,
} from '@payloadcms/richtext-lexical/lexical';

import { ICON_KEYS } from '@/components/icons/ComponentIcon';
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
import { PrettyIconNode } from '../features/pretty-icons/client/nodes/PrettyIconNode';
import {
  getCardTypeEmoji,
  getCostEmoji,
  getRuneEmoji,
  getSymbolEmoji,
} from './discord';

const toDiscordEmoji = (icon: ICON_KEYS) => {
  switch (icon) {
    case 'any':
      return getRuneEmoji('Any');
    case 'battlefield':
      return getCardTypeEmoji('Battlefield');
    case 'calm':
    case 'calm_color':
    case 'calm_complete':
    case 'calm_complex':
      return getRuneEmoji('Calm');
    case 'champion':
      return getCardTypeEmoji('Champion');
    case 'chaos':
    case 'chaos_color':
    case 'chaos_complete':
    case 'chaos_complex':
      return getRuneEmoji('Chaos');
    case 'cost0':
      return getCostEmoji(0);
    case 'cost1':
      return getCostEmoji(1);
    case 'cost2':
      return getCostEmoji(2);
    case 'cost3':
      return getCostEmoji(3);
    case 'cost4':
      return getCostEmoji(4);
    case 'cost5':
      return getCostEmoji(5);
    case 'cost6':
      return getCostEmoji(6);
    case 'cost7':
      return getCostEmoji(7);
    case 'cost8':
      return getCostEmoji(8);
    case 'cost9':
      return getCostEmoji(9);
    case 'cost10':
      return getCostEmoji(10);
    case 'cost11':
      return getCostEmoji(11);
    case 'exhaust':
      return getSymbolEmoji('exhaust');
    case 'fury':
    case 'fury_color':
    case 'fury_complete':
    case 'fury_complex':
      return getRuneEmoji('Fury');
    case 'gear':
      return getCardTypeEmoji('Gear');
    case 'legend':
      return getCardTypeEmoji('Legend');
    case 'logo':
      break;
    case 'mental':
    case 'mental_color':
    case 'mental_complete':
    case 'mental_complex':
      return getRuneEmoji('Mental');
    case 'might':
      return getSymbolEmoji('might');
    case 'order':
    case 'order_color':
    case 'order_complete':
    case 'order_complex':
      return getRuneEmoji('Order');
    case 'physical':
    case 'physical_color':
    case 'physical_complete':
    case 'physical_complex':
      return getRuneEmoji('Physical');
    case 'rune':
      return getCardTypeEmoji('Rune');
    case 'spell':
      return getCardTypeEmoji('Spell');
    case 'unit':
      return getCardTypeEmoji('Unit');
  }
};

export async function lexicalToDiscord(
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
    headlessEditor
      .getEditorState()
      .read(() => {
        return $getRoot()
          .getChildren()
          .map((node) => {
            if ($isElementNode(node)) {
              return node
                .getChildren()
                .map((childNode) => {
                  if (childNode.getType() === 'prettyIcon') {
                    const icon = (childNode as PrettyIconNode).getIcon();
                    return toDiscordEmoji(icon);
                  }
                  if (childNode.getType() === 'prettyKeyword') {
                    return `\`${childNode.getTextContent()}\``;
                  }
                  return childNode.getTextContent();
                })
                .join('');
            }
            return node.getTextContent();
          });
      })
      .join('') || ''
  );
}
