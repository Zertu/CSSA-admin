import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import Icon from "../../Icon/Icon";

function LinksGroup({ header, headerLink, childrenLinks, glyph, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [match, setMatch] = useState(location?.pathname === headerLink);

  useEffect(() => {
    setMatch(location?.pathname === headerLink);
  }, [location, headerLink]);

  if (!childrenLinks || childrenLinks.filter((i) => i.index).length === 1) {
    return (
      <ListItem component={NavLink} to={headerLink} className={className}>
        {glyph && (
          <ListItemIcon>
            <Icon glyph={glyph} />
          </ListItemIcon>
        )}
        <ListItemText primary={header} />
      </ListItem>
    );
  }

  return (
    <>
      <ListItem
        selected={match}
        onClick={() => setIsOpen(!isOpen)}
        className={className}
      >
        {glyph && (
          <ListItemIcon>
            <Icon glyph={glyph} />
          </ListItemIcon>
        )}
        <ListItemText primary={header} />
        <IconButton edge="end">
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {childrenLinks &&
            childrenLinks
              .filter((i) => i.show)
              .map((child) => (
                <ListItem
                  selected={match}
                  key={child.title}
                  component={NavLink}
                  to={child.headerLink}
                  onClick={() => setIsOpen(true)}
                >
                  <ListItemText primary={child.title} />
                </ListItem>
              ))}
        </List>
      </Collapse>
    </>
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
