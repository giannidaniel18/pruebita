import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import { Stack } from "@mui/material";

//https://rajaraodv.medium.com/how-draft-js-represents-rich-text-data-eeabb5f25cf2#9260

const TextEditor = ({ setContent, rawContent = {} }) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(
    rawContent.blocks ? EditorState.createWithContent(convertFromRaw(rawContent)) : EditorState.createEmpty()
  );

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  const onChange = (state) => {
    setEditorState(state);
    setContent(convertToRaw(editorState.getCurrentContent()));
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState, eventTimeStamp) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <Stack spacing={2} sx={{ borderRadius: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
      </Stack>
      <Stack
        sx={{
          backgroundColor: "white",
          color: "black",
          width: "100%",
          minHeight: "200px",
          border: "1px solid white",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          placeholder="Sin plantilla"
          blockStyleFn={(block) => getBlockStyle(block)}
          keyBindingFn={(e) => mapKeyToEditorCommand(e)} // no se que hace
          onChange={onChange}
          spellCheck={true}
          handleKeyCommand={handleKeyCommand}
        />
      </Stack>
    </Stack>
  );
};

export default React.memo(TextEditor);
