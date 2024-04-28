import React, { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "reactstrap";

import Icon from "../../Icon/Icon";

import s from "./LinksGroup.module.scss";

function LinksGroup({ header, headerLink, childrenLinks, glyph, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [match, setMatch] = useState(location?.pathname === headerLink);
  React.useEffect(() => {
    setMatch(location?.pathname === headerLink);
  }, [location, headerLink]);
  if (!childrenLinks||childrenLinks.filter((i) => i.index).length === 1){
    return (
      <li className={cx(s.headerLink, className)}>
        <NavLink
          to={headerLink}
          className={({ isActive }) => (isActive ? s.headerLinkActive : "")}
        >
          <div>
            {glyph && <Icon glyph={glyph} />}
            <span>{header}</span>
          </div>
        </NavLink>
      </li>
    );
  }

  return (
    <li className={cx(s.headerLink, className)}>
      <a
        className={cx({ [s.headerLinkActive]: !!match })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          {glyph && <Icon glyph={glyph} />}
          <span>{header}</span>
        </div>
        <b
          className={cx("fa fa-angle-left arrow", s.arrow, {
            [s.arrowActive]: isOpen,
          })}
        />
      </a>
      <Collapse className={s.panel} isOpen={isOpen}>
        <ul>
          {childrenLinks &&
            childrenLinks
              .filter((i) => i.show)
              .map((child) => (
                <li key={child.title}>
                  <NavLink
                    to={child.headerLink}
                    onClick={() => setIsOpen(true)}
                    className={({ isActive }) =>
                      isActive ? s.headerLinkActive : ""
                    }
                  >
                    {child.title}
                  </NavLink>
                </li>
              ))}
        </ul>
      </Collapse>
    </li>
  );
}

LinksGroup.propTypes = {
  header: PropTypes.node.isRequired,
  headerLink: PropTypes.string,
  childrenLinks: PropTypes.array,
  glyph: PropTypes.string,
  className: PropTypes.string,
};

LinksGroup.defaultProps = {
  headerLink: null,
  childrenLinks: null,
  className: "",
  glyph: null,
};

export default LinksGroup;
