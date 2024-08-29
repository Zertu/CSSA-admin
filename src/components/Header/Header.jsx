import { useDispatch } from "react-redux";
import cx from "classnames";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "../Icon/Icon";
import photo from "../../images/photo.jpg";
import { logoutUser } from "../../actions/user";
import s from "./Header.module.scss";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

const Header = ({ sidebarToggle }) => {
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={s.nav}>
      <Grid
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flex={1}
      >
        <Grid
          display="flex"
          className={cx(" mr-4 d-sm-up-none", s.headerIcon, s.sidebarToggler)}
          // href="#"
          onClick={sidebarToggle}
        >
          <i className="fa fa-bars fa-2x text-muted" />
        </Grid>
        <Grid>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search details" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Grid className={cx("", s.headerIcon)}>
          <Icon glyph="mail" />
        </Grid>
        <Grid className={cx("", s.headerIcon)}>
          <Icon glyph="notification" />
        </Grid>
        <Grid className={cx("", s.headerIcon)}>
          <Icon glyph="settings" />
        </Grid>

        <Grid display="flex" justifyContent="center" alignItems="center">
          <img
            className={cx("rounded-circle mr-sm", s.adminPhoto)}
            src={photo}
            alt="administrator"
          />
        </Grid>
        <Grid
          {...bindTrigger(popupState)}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <span className="text-body">Administrator</span>
            <i
              className={cx("fa fa-angle-down ml-sm", s.arrow, {
                [s.arrowActive]: popupState.isOpen,
              })}
            />
          </Grid>
        </Grid>
        <Menu {...bindMenu(popupState)}>
          <MenuItem>
            <Link className="text-body" href="/app/posts" underline="none">
              Posts
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="text-body" href="/app/profile" underline="none">
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={doLogout}>
            <Link className="text-body" href="/login" underline="none">
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </Grid>
    </div>
  );
};

export default Header;
