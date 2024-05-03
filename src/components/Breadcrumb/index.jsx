import { useLocation, NavLink, useParams } from "react-router-dom";
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
    <ol className="breadcrumb">
      <li className="breadcrumb-item">You Are Here</li>
      {title.map((i, index) => (
        <NavLink
          to={`/app${i.path}`}
          key={index}
          className="active breadcrumb-item"
        >
          {i.title}
        </NavLink>
      ))}
    </ol>
  );
};

export default Breadcrumbs;
