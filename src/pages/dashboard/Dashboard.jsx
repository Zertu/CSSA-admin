import { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Widget from "../../components/Widget/Widget";
import s from "./Dashboard.module.scss";

const Dashboard = ({ posts, isFetching }) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const formatDate = (str) => str.replace(/,.*$/, "");

  const toggleDropdown = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  return <div className={s.root}></div>;
};

Dashboard.propTypes = {
  posts: PropTypes.any,
  isFetching: PropTypes.bool,
};

Dashboard.defaultProps = {
  posts: [],
  isFetching: false,
};

export default Dashboard;
