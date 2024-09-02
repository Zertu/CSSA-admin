import * as React from "react";
import style from "./index.module.scss";
import clsx from "clsx";
const Label = (props) => {
  const { children, className, error, required, filled } = props;

  return (
    <p
      style={{ minWidth: 120 }}
      className={clsx(style, className, error ? "invalid" : "")}
    >
      {required ? <span style={{ color: "red" }}> *</span> : ""}
      {children}
    </p>
  );
};

export default Label;
