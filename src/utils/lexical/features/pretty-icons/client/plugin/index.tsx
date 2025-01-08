'use client';

import { ICON_KEYS } from '@/components/icons/ComponentIcon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';

import { $getSelection, $isRangeSelection, TextNode } from 'lexical';

import { useCallback, useEffect, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import {
  $createPrettyIconNode,
  PrettyIconNodeProps,
} from '../nodes/PrettyIconNode';

export interface Icon {
  description: string;
  icon: ICON_KEYS;
  category: 'Rune Type' | 'Card Type' | 'Rules Indicator';
  tags: string[];
  complex?: boolean;
  colored?: boolean;
  value?: number;
}

class IconOption extends MenuOption {
  title: ICON_KEYS;
  keywords: Array<string>;

  constructor(
    title: ICON_KEYS,
    options: {
      keywords?: Array<string>;
    }
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
  }
}

function IconMenuItem({
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
  option: IconOption;
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
      <span className="text">{option.title}</span>
    </li>
  );
}

const MAX_ICON_SUGGESTION_COUNT = 10;

export const getIconProps = (icon: ICON_KEYS): PrettyIconNodeProps => {
  const iconParts = icon.split('_');
  const valueStr = icon.match(/(\d+)/)?.pop();
  const flagStr = iconParts.length > 1 ? iconParts[1] : '';
  const isComplex = JSON.stringify(
    flagStr === 'complex' || flagStr === 'complete'
  );
  const isColored = JSON.stringify(
    flagStr === 'color' || flagStr === 'complete'
  );

  return {
    icon: icon,
    value: valueStr && JSON.parse(valueStr),
    complex: isComplex,
    colored: isColored,
  };
};

export default function PrettyIconPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);
  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    import('../utils/icon-list').then((file) => setIcons(file.default));
  }, []);

  const iconOptions = useMemo(
    () =>
      icons != null
        ? icons.map(
            ({ icon, tags }) =>
              new IconOption(icon, {
                keywords: [...tags],
              })
          )
        : [],
    [icons]
  );

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch(':', {
    minLength: 0,
  });

  const options: Array<IconOption> = useMemo(() => {
    return iconOptions
      .filter((option: IconOption) => {
        return queryString != null
          ? new RegExp(queryString, 'gi').exec(option.title) ||
            option.keywords != null
            ? option.keywords.some((keyword: string) =>
                new RegExp(queryString, 'gi').exec(keyword)
              )
            : false
          : iconOptions;
      })
      .slice(0, MAX_ICON_SUGGESTION_COUNT);
  }, [iconOptions, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: IconOption,
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

        const iconProps = getIconProps(selectedOption.title);

        selection.insertNodes([$createPrettyIconNode(iconProps)]);

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
              <div className="typeahead-popover icon-menu">
                <ul>
                  {options.map((option: IconOption, index) => (
                    <IconMenuItem
                      key={option.key}
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
}
