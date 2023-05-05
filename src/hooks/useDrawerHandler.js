import { useState } from "react";

export function useDrawerHandler() {
  const [drawerVisibleMode, setDrawerVisibleMode] = useState(false);
  const [drawerDataToHandle, setDrawerDataToHandle] = useState({});

  const onToggleDrawerVisibleMode = () => {
    setDrawerVisibleMode(!drawerVisibleMode);
  };
  const resetDrawerDataToHandle = () => {
    setDrawerDataToHandle({});
  };
  const onSettingDrawerDataToHandle = (dataToHandle) => {
    onToggleDrawerVisibleMode();

    setDrawerDataToHandle(dataToHandle);
  };

  return {
    drawerVisibleMode,
    drawerDataToHandle,
    resetDrawerDataToHandle,
    onSettingDrawerDataToHandle,
    onToggleDrawerVisibleMode,
  };
}
