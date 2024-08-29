import React from "react";
import { useLocation, NavLink, useParams } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { findTitleByPath } from "@/router";

const Breadcrumbs = () => {
  const navigate = useLocation();
  const params = useParams();
  let title = [];

  if (params.id) {
    title = findTitleByPath(navigate.pathname.replace(`/${params.id}`, ""));
  } else {
    title = findTitleByPath(navigate.pathname);
  }

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/app">
        Home
      </Link>
      {title.map((i, index) => {
        const isLast = index === title.length - 1;
        return isLast ? (
          <Typography key={index} color="textPrimary">
            {i.title}
          </Typography>
        ) : (
          <Link
            component={NavLink}
            to={`/app${i.path}`}
            key={index}
            color="inherit"
            underline="hover"
          >
            {i.title}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
