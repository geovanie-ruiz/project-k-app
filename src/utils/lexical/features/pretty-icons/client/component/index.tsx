'use client';

import Icon from '@/components/icons/ComponentIcon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import {
  $getNodeByKey,
  $getSelection,
  $isDecoratorNode,
  $isElementNode,
  $isNodeSelection,
  $isTextNode,
  $setSelection,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from '@payloadcms/richtext-lexical/lexical';
import { mergeRegister } from '@payloadcms/richtext-lexical/lexical/utils';
import { useCallback, useEffect } from 'react';
import {
  $isPrettyIconNode,
  PrettyIconNodeProps,
} from '../nodes/PrettyIconNode';

type PrettyIconComponentProps = {
  iconProps: PrettyIconNodeProps;
  nodeKey: NodeKey;
};

function PrettyIconComponent({
  nodeKey,
  iconProps,
}: PrettyIconComponentProps): React.JSX.Element {
  const { icon: iconType, ...rest } = iconProps;
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected] = useLexicalNodeSelection(nodeKey);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        payload.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isPrettyIconNode(node)) {
          node?.remove();
        }
      }
      return false;
    },
    [isSelected, nodeKey]
  );

  const onArrowLeftPress = useCallback(
    (event: KeyboardEvent) => {
      const node = $getNodeByKey(nodeKey);
      if (!node?.isSelected()) {
        return false;
      }
      let handled = false;
      const nodeToSelect = node.getPreviousSibling();
      if ($isElementNode(nodeToSelect)) {
        nodeToSelect.selectEnd();
        handled = true;
      }
      if ($isTextNode(nodeToSelect)) {
        nodeToSelect.select();
        handled = true;
      }
      if ($isDecoratorNode(nodeToSelect)) {
        nodeToSelect.selectNext();
        handled = true;
      }
      if (nodeToSelect === null) {
        node.selectPrevious();
        handled = true;
      }
      if (handled) {
        event.preventDefault();
      }
      return handled;
    },
    [nodeKey]
  );

  const onArrowRightPress = useCallback(
    (event: KeyboardEvent) => {
      const node = $getNodeByKey(nodeKey);
      if (!node?.isSelected()) {
        return false;
      }
      let handled = false;
      const nodeToSelect = node.getNextSibling();
      if ($isElementNode(nodeToSelect)) {
        nodeToSelect.selectStart();
        handled = true;
      }
      if ($isTextNode(nodeToSelect)) {
        nodeToSelect.select(0, 0);
        handled = true;
      }
      if ($isDecoratorNode(nodeToSelect)) {
        nodeToSelect.selectPrevious();
        handled = true;
      }
      if (nodeToSelect === null) {
        node.selectNext();
        handled = true;
      }
      if (handled) {
        event.preventDefault();
      }
      return handled;
    },
    [nodeKey]
  );

  const onBlur = useCallback(() => {
    const node = $getNodeByKey(nodeKey);
    if (!node?.isSelected()) {
      return false;
    }

    const selection = $getSelection();
    if (!$isNodeSelection(selection)) {
      return false;
    }

    $setSelection(null);
    return false;
  }, [nodeKey]);

  const onSelectionChange = useCallback(() => {
    if (isSelected) {
      setSelected(false);
      return true;
    }
    return false;
  }, [isSelected, setSelected]);

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_LEFT_COMMAND,
        onArrowLeftPress,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_RIGHT_COMMAND,
        onArrowRightPress,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(BLUR_COMMAND, onBlur, COMMAND_PRIORITY_LOW),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        onSelectionChange,
        COMMAND_PRIORITY_LOW
      )
    );
    return () => {
      unregister();
    };
  }, [
    editor,
    onArrowLeftPress,
    onArrowRightPress,
    onDelete,
    onBlur,
    onSelectionChange,
  ]);

  return <Icon iconType={iconType} iconProps={rest} />;
}

export default PrettyIconComponent;
