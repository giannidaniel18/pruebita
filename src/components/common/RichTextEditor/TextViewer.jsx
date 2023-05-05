import React, { useRef } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

import { Stack } from "@mui/material";

//https://rajaraodv.medium.com/how-draft-js-represents-rich-text-data-eeabb5f25cf2#9260

const TextViewer = ({ setContent, rawContent = {} }) => {
  const editorRef = useRef(null);
  const editorState = rawContent.blocks
    ? EditorState.createWithContent(convertFromRaw(rawContent))
    : EditorState.createEmpty();

  return (
    <Stack spacing={2} sx={{ borderRadius: 2 }}>
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
        <Editor ref={editorRef} editorState={editorState} placeholder="Sin información..." readOnly />
      </Stack>
    </Stack>
  );
};

export default React.memo(TextViewer);
