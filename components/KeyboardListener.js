// @flow
import React, { useEffect } from "react";

type Props = {
  increaseFocusedMilestoneFn: () => void,
  selectNextTrackFn: () => void,
  decreaseFocusedMilestoneFn: () => void,
  selectPrevTrackFn: () => void,
};

const KeyboardListener = (props: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowUp":
          props.increaseFocusedMilestoneFn();
          e.preventDefault();
          break;
        case "ArrowRight":
          props.selectNextTrackFn();
          e.preventDefault();
          break;
        case "ArrowDown":
          props.decreaseFocusedMilestoneFn();
          e.preventDefault();
          break;
        case "ArrowLeft":
          props.selectPrevTrackFn();
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};

export default KeyboardListener;
