import React from "react";
import styles from "./checker.css";

export default function Checker({ isDark, onClick }) {
  let className = "checker";
  className += isDark ? " dark" : " light";
  return <div className={className} onClick={onClick} />;
}
