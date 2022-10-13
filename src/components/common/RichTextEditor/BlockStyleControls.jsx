import React from "react";
import StyleButton from "./StyleButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TitleIcon from "@mui/icons-material/Title";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import AbcIcon from "@mui/icons-material/Abc";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import { Stack } from "@mui/material";

const BLOCK_TYPES = [
  { id: "h1", label: <TitleIcon fontSize="small" />, style: "header-one" },
  { id: "h2", label: <TextFieldsIcon fontSize="small" />, style: "header-two" },
  { id: "text", label: <AbcIcon fontSize="small" />, style: "header-three" },
  { id: "ul", label: <FormatListBulletedIcon fontSize="small" />, style: "unordered-list-item" },
  { id: "ol", label: <FormatListNumberedIcon fontSize="small" />, style: "ordered-list-item" },
  { id: "code", label: <CodeIcon fontSize="small" />, style: "code-block" },
];

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <Stack direction="row" className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.id}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </Stack>
  );
};

export default React.memo(BlockStyleControls);
