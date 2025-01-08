import { ICON_KEYS } from '@/components/icons/ComponentIcon';
import {
  $applyNodeReplacement,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from '@payloadcms/richtext-lexical/lexical';

import PrettyIcon from '../component';

export type PrettyIconNodeProps = {
  icon: ICON_KEYS;
  value: number;
  complex: string;
  colored: string;
};

export type SerializedPrettyIconNode = Spread<
  {
    icon: ICON_KEYS;
    value: number;
    complex: string;
    colored: string;
    text: string;
  },
  SerializedLexicalNode
>;

function $convertPrettyIconElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const icon = domNode.getAttribute(
    'data-lexical-pretty-icon-icon'
  ) as ICON_KEYS;

  let value = 0;
  const valueStr = domNode.getAttribute('data-lexical-pretty-icon-value');
  if (valueStr) {
    try {
      value = JSON.parse(valueStr) as number;
    } catch (error) {
      console.error(`Error parsing Pretty Icon value ${valueStr}:`, error);
    }
  }

  const complex =
    domNode.getAttribute('data-lexical-pretty-icon-complex') || 'false';
  const colored =
    domNode.getAttribute('data-lexical-pretty-icon-colored') || 'false';

  if (icon !== null) {
    const node = $createPrettyIconNode({ icon, value, complex, colored });
    return { node };
  }

  return null;
}

export class PrettyIconNode extends DecoratorNode<React.JSX.Element> {
  __icon: ICON_KEYS;
  __value: number;
  __complex: string;
  __colored: string;

  static getType(): string {
    return 'prettyIcon';
  }

  static clone(node: PrettyIconNode): PrettyIconNode {
    return new PrettyIconNode(
      {
        icon: node.__icon,
        value: node.__value,
        complex: node.__complex,
        colored: node.__colored,
      },
      node.__key
    );
  }

  constructor(
    { icon, value, complex, colored }: PrettyIconNodeProps,
    key?: NodeKey
  ) {
    super(key);
    this.__icon = icon;
    this.__value = value;
    this.__complex = complex;
    this.__colored = colored;
  }

  static importJSON(_serializedNode: SerializedPrettyIconNode): PrettyIconNode {
    return $createPrettyIconNode({
      icon: _serializedNode.icon,
      value: _serializedNode.value,
      complex: _serializedNode.complex,
      colored: _serializedNode.colored,
    });
  }

  exportJSON(): SerializedPrettyIconNode {
    return {
      text: `:${this.__icon}:`,
      icon: this.__icon,
      value: this.__value,
      complex: this.__complex,
      colored: this.__colored,
      type: 'prettyIcon',
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    return document.createElement('span');
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-pretty-icon', 'true');
    element.setAttribute('data-lexical-pretty-icon-icon', this.__icon);
    if (this.__value) {
      element.setAttribute(
        'data-lexical-pretty-icon-value',
        JSON.stringify(this.__value)
      );
    }
    if (this.__value) {
      element.setAttribute('data-lexical-pretty-icon-complex', this.__complex);
    }
    if (this.__value) {
      element.setAttribute('data-lexical-pretty-icon-colored', this.__colored);
    }
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-pretty-icon')) {
          return null;
        }
        return {
          conversion: $convertPrettyIconElement,
          priority: 1,
        };
      },
    };
  }

  updateDOM(): boolean {
    return false;
  }

  getTextContent(): string {
    return `DAVID! ${this.__icon}`;
  }

  getIcon(): ICON_KEYS {
    const self = this.getLatest();
    return self.__icon;
  }

  getValue(): number {
    const self = this.getLatest();
    return self.__value;
  }

  getComplex(): string {
    const self = this.getLatest();
    return self.__complex;
  }

  getColored(): string {
    const self = this.getLatest();
    return self.__colored;
  }

  getIconProps(): PrettyIconNodeProps {
    return {
      icon: this.getIcon(),
      value: this.getValue(),
      complex: this.getComplex(),
      colored: this.getColored(),
    };
  }

  decorate(): React.JSX.Element {
    return (
      <PrettyIcon nodeKey={this.getKey()} iconProps={this.getIconProps()} />
    );
  }
}

export function $createPrettyIconNode({
  icon,
  value = 0,
  complex = 'false',
  colored = 'false',
}: PrettyIconNodeProps): PrettyIconNode {
  const iconNode = new PrettyIconNode({ icon, value, complex, colored });
  return $applyNodeReplacement(iconNode);
}

export function $isPrettyIconNode(
  node: LexicalNode | null | undefined
): node is PrettyIconNode {
  return node instanceof PrettyIconNode;
}
