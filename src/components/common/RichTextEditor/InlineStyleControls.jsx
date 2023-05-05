import React from "react";

import StyleButton from "./StyleButton";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Stack } from "@mui/material";

const INLINE_STYLES = [
  { id: "bold", icon: <FormatBoldIcon fontSize="small" />, style: "BOLD" },
  { id: "italic", icon: <FormatItalicIcon fontSize="small" />, style: "ITALIC" },
  { id: "underline", icon: <FormatUnderlinedIcon fontSize="small" />, style: "UNDERLINE" },
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <Stack direction="row" className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.id}
          active={currentStyle.has(type.style)}
          icon={type.icon}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </Stack>
  );
};

export default React.memo(InlineStyleControls);
