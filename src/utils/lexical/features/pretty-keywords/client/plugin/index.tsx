'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';

import { $getSelection, $isRangeSelection, TextNode } from 'lexical';

import { useCallback, useEffect, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { $createPrettyKeywordNode } from '../nodes/PrettyKeywordNode';

export interface Keyword {
  keyword: string;
  color: string;
  label: string;
}

class KeywordOption extends MenuOption {
  keyword: string;
  color: string;
  label: string;

  constructor(keyword: string, color: string, label: string) {
    super(keyword);
    this.keyword = keyword;
    this.color = color;
    this.label = label;
  }
}

function KeywordMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: KeywordOption;
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={'typeahead-item-' + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <span className="text">{option.label}</span>
    </li>
  );
}

const MAX_KEYWORD_SUGGESTION_COUNT = 10;

export const PrettyKeywordPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  useEffect(() => {
    import('../utils/keyword-list').then((file) => setKeywords(file.default));
  }, []);

  const keywordOptions = useMemo(
    () =>
      keywords != null
        ? keywords.map(
            ({ keyword, color, label }) =>
              new KeywordOption(keyword, color, label)
          )
        : [],
    [keywords]
  );

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('[', {
    minLength: 0,
  });

  const options: Array<KeywordOption> = useMemo(() => {
    return keywordOptions
      .filter((option: KeywordOption | undefined) => {
        if (!option) return keywordOptions;
        return queryString != null
          ? new RegExp(queryString, 'gi').exec(option.keyword)
          : keywordOptions;
      })
      .slice(0, MAX_KEYWORD_SUGGESTION_COUNT);
  }, [keywordOptions, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: KeywordOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void
    ) => {
      editor.update(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection) || selectedOption == null) {
          return;
        }

        if (nodeToRemove) {
          nodeToRemove.remove();
        }

        const node = $createPrettyKeywordNode({
          keyword: selectedOption.label,
          color: selectedOption.color,
        });
        selection.insertNodes([node]);
        closeMenu();
      });
    },
    [editor]
  );

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) => {
        if (anchorElementRef.current == null || options.length === 0) {
          return null;
        }

        return anchorElementRef.current && options.length
          ? ReactDOM.createPortal(
              <div className="typeahead-popover icon-menu data-popover">
                <ul>
                  {options.map((option: KeywordOption, index) => (
                    <KeywordMenuItem
                      index={index}
                      isSelected={selectedIndex === index}
                      onClick={() => {
                        setHighlightedIndex(index);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(index);
                      }}
                      option={option}
                      key={option.key}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current
            )
          : null;
      }}
    />
  );
};
