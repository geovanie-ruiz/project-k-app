import type { TextMatchTransformer } from '@payloadcms/richtext-lexical/lexical/markdown';
import { $createPrettyIconNode } from './client/nodes/PrettyIconNode';
import { getIconProps } from './client/plugin';
import IconList from './client/utils/icon-list';

export const MarkdownTransformer: TextMatchTransformer = {
  dependencies: [],
  export: () => null,
  importRegExp: /:([a-z0-9_]+):/,
  regExp: /:([a-z0-9_]+):$/,
  replace: (textNode, [, name]) => {
    const icon = IconList.find((icon) => icon.icon === name)?.icon;
    if (icon) {
      const iconProps = getIconProps(icon);
      textNode.replace($createPrettyIconNode(iconProps));
    }
  },
  trigger: ':',
  type: 'text-match',
};
