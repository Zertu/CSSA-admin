import React from "react";
import PropTypes from "prop-types";

import s from "./Icon.module.scss";

import icons from "./icons";

const Icon = ({ glyph }) =>
  icons[glyph] ? (
    <img className={s.icon} src={icons[glyph]} alt={`${glyph}-icon`} />
  ) : null;

Icon.propTypes = {
  glyph: PropTypes.string.isRequired,
};

export default Icon;
