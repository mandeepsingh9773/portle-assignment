import React, { useState } from "react";
import { Editor, EditorState, RichUtils} from "draft-js";
import "draft-js/dist/Draft.css";

const Extra = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleInputChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBeforeInput = (char) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection(); // Update this line
    const currentBlock = contentState.getBlockForKey(selectionState.getStartKey());
    const lineText = currentBlock.getText();

    // Check for "#" at the beginning of a line
    if (char === "#" && selectionState.getStartOffset() === 0) {
      const newContentState = RichUtils.toggleBlockType(
        contentState,
        selectionState,
        "header-one"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-block-type"
      );
      setEditorState(newEditorState);
      return "handled";
    }

    // Check for "*" at the beginning of a line
    if (char === "*" && selectionState.getStartOffset() === 0) {
      const newContentState = RichUtils.toggleInlineStyle(contentState, "BOLD");
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(newEditorState);
      return "handled";
    }

    // Check for "** " at the beginning of a line
    if (lineText.startsWith("** ") && char === " ") {
      const newContentState = RichUtils.toggleInlineStyle(
        contentState,
        selectionState,
        "STRIKETHROUGH"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(newEditorState);
      return "handled";
    }

    // Check for "*** " at the beginning of a line
    if (lineText.startsWith("*** ") && char === " ") {
      const newContentState = RichUtils.toggleInlineStyle(
        contentState,
        selectionState,
        "UNDERLINE"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(newEditorState);
      return "handled";
    }

    return "not-handled";
  };

  return (
    <>
      <div className="border-2 border-blue-600 p-4 m-6">
        <Editor
          editorState={editorState}
          onChange={handleInputChange}
          handleBeforeInput={handleBeforeInput}
        />
      </div>
    </>
  );
};

export default Extra;
