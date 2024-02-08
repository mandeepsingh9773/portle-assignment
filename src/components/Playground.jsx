import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "../../node_modules/draft-js/dist/Draft.css";
import "./Playground.css";

const Playground = () => {
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBeforeInput = (char, editorState) => {
    console.log(char);
    if (char === "#" && editorState.getSelection().getStartOffset() === 0) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "header-one"));
      return "handled";
    } else if (
      char === "*" &&
      editorState.getSelection().getStartOffset() === 0
    ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
      return "handled";
    } else if (
      char === "**" &&
      editorState.getSelection().getStartOffset() === 0
    ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "COLOR-RED"));
      return "handled";
    } else if (
      char === "***" &&
      editorState.getSelection().getStartOffset() === 0
    ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      return "handled";
    }
    return "not-handled";
  };

  const handleSaveClick = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContentState));
    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false);
    }, 100);
  };
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  return (
    <>
      <div className="flex mt-8 justify-center">
        <div className="container1 flex flex-grow items-end justify-end">
          <h3 className="text-lg font-semibold">Demo Editor by Mandeep</h3>
        </div>
        <div className="container2 flex flex-grow items-end justify-end pr-14 w-2">
          <button
            onClick={handleSaveClick}
            className={`px-5 py-1 text-black border-4 border-black ${
              isButtonClicked ? "bg-green-400" : ""
            }`}
          >
            SAVE
          </button>
        </div>
      </div>
      <div className="border-2 border-blue-500 p-4 m-8">
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleBeforeInput={handleBeforeInput}
        />
      </div>
    </>
  );
};

export default Playground;



