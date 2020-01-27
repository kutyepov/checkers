import React from "react";
import styles from "./tile.css";

export default function Tile({ isDark, canMoveHere, onClick, children }) {
  let className = "tile";
  className += isDark ? " dark" : " light";
  className += canMoveHere ? " can-move-here" : "";
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
