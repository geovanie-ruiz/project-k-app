import type { TextMatchTransformer } from '@payloadcms/richtext-lexical/lexical/markdown';
import { $createPrettyKeywordNode } from './client/nodes/PrettyKeywordNode';
import KeywordList from './client/utils/keyword-list';

export const MarkdownTransformer: TextMatchTransformer = {
  dependencies: [],
  export: () => null,
  importRegExp: /\[([a-z]+)(:\b([0-9]|[1-9][0-9])\b)?\]/,
  regExp: /\[([a-z]+)(:\b([0-9]|[1-9][0-9])\b)?\]$/,
  replace: (textNode, match) => {
    const keywordId = match[0].replace('[', '').replace(']', '');
    const keyword = KeywordList.find(
      (keyword) => keyword.keyword === keywordId
    );
    if (!keyword) return;
    textNode.replace(
      $createPrettyKeywordNode({ keyword: keyword.label, color: keyword.color })
    );
  },
  trigger: ']',
  type: 'text-match',
};
