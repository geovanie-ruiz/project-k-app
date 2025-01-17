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

import PrettyKeyword from '../component';

export type PrettyKeywordNodeProps = {
  keyword: string;
  color: string;
};

export type SerializedPrettyKeywordNode = Spread<
  {
    keyword: string;
    color: string;
    text: string;
  },
  SerializedLexicalNode
>;

function $convertPrettyKeywordElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const keyword = domNode.getAttribute('data-lexical-pretty-keyword-keyword');
  const color = domNode.getAttribute('data-lexical-pretty-keyword-color');

  if (keyword && color) {
    const node = $createPrettyKeywordNode({ keyword, color });
    return { node };
  }

  return null;
}

export class PrettyKeywordNode extends DecoratorNode<React.JSX.Element> {
  __keyword: string;
  __color: string;

  static getType(): string {
    return 'prettyKeyword';
  }

  static clone(node: PrettyKeywordNode): PrettyKeywordNode {
    return new PrettyKeywordNode(
      {
        keyword: node.__keyword,
        color: node.__color,
      },
      node.__key
    );
  }

  constructor({ keyword, color }: PrettyKeywordNodeProps, key?: NodeKey) {
    super(key);
    this.__keyword = keyword;
    this.__color = color;
  }

  static importJSON(
    _serializedNode: SerializedPrettyKeywordNode
  ): PrettyKeywordNode {
    return $createPrettyKeywordNode({
      keyword: _serializedNode.keyword,
      color: _serializedNode.color,
    });
  }

  exportJSON(): SerializedPrettyKeywordNode {
    return {
      text: `[${this.__keyword}]`,
      keyword: this.__keyword,
      color: this.__color,
      type: 'prettyKeyword',
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    return document.createElement('span');
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-pretty-keyword', 'true');
    element.setAttribute('data-lexical-pretty-keyword-keyword', this.__keyword);
    element.setAttribute('data-lexical-pretty-keyword-color', this.__color);
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-pretty-keyword')) {
          return null;
        }
        return {
          conversion: $convertPrettyKeywordElement,
          priority: 1,
        };
      },
    };
  }

  updateDOM(): boolean {
    return false;
  }

  getTextContent(): string {
    return `${this.__keyword}`;
  }

  getKeyword(): string {
    const self = this.getLatest();
    return self.__keyword;
  }

  getColor(): string {
    const self = this.getLatest();
    return self.__color;
  }

  getKeywordProps(): PrettyKeywordNodeProps {
    return {
      keyword: this.getKeyword(),
      color: this.getColor(),
    };
  }

  decorate(): React.JSX.Element {
    return (
      <PrettyKeyword
        nodeKey={this.getKey()}
        keywordProps={this.getKeywordProps()}
      />
    );
  }
}

export function $createPrettyKeywordNode({
  keyword,
  color,
}: PrettyKeywordNodeProps): PrettyKeywordNode {
  const keywordNode = new PrettyKeywordNode({ keyword, color });
  return $applyNodeReplacement(keywordNode);
}

export function $isPrettyKeywordNode(
  node: LexicalNode | null | undefined
): node is PrettyKeywordNode {
  return node instanceof PrettyKeywordNode;
}
