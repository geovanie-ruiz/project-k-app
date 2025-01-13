import {
  DefaultNodeTypes,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from '@payloadcms/richtext-lexical/react';

import Icon from '@/components/icons/ComponentIcon';
import { SerializedPrettyIconNode } from '@/utils/lexical/features/pretty-icons/client/nodes/PrettyIconNode';
import { SerializedPrettyKeywordNode } from '@/utils/lexical/features/pretty-keywords/client/nodes/PrettyKeywordNode';
import { cn } from '@/utils/utils';
import Keyword from './keyword';

type NodeTypes = DefaultNodeTypes;

const prettyIcon = ({ node }: { node: SerializedPrettyIconNode }) => {
  const props = {
    value: node.value,
    complex: node.complex,
    colored: node.colored,
    className: 'inline-block align-middle',
  };
  return <Icon iconType={node.icon} iconProps={props} />;
};

const prettyKeyword = ({ node }: { node: SerializedPrettyKeywordNode }) => (
  <Keyword label={node.keyword} color={node.color} />
);

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  prettyIcon,
  prettyKeyword,
});

const inlineConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (!children.length) {
      return <span></span>;
    }
    return <span className="inline leading-8">{children}</span>;
  },
  prettyIcon,
  prettyKeyword,
});

type Props = {
  data: SerializedEditorState;
  enableInline?: boolean;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichTextViewer(props: Props) {
  const {
    className,
    enableInline = false,
    enableProse = true,
    enableGutter = true,
    ...rest
  } = props;
  return (
    <RichText
      converters={enableInline ? inlineConverters : jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className
      )}
      {...rest}
    />
  );
}
