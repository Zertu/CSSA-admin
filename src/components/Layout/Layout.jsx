/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import cx from "classnames";
import { Routes, Route } from "react-router-dom";

import s from "./Layout.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from "../../pages/dashboard/Dashboard";
import Buttons from "../../pages/buttons/Buttons";
import Charts from "../../pages/charts/Charts";
// import Maps from '../../pages/google/Google'
import NotFound from "../../pages/notFound/NotFound";
import Icons from "../../pages/icons/Icons";
import Typography from "../../pages/typography/Typography";
import Tables from "../../pages/tables/Tables";
import Notifications from "../../pages/notifications/Notifications";
import Posts from "../../pages/posts/Posts";
import Profile from "../../pages/profile/Profile";
import Privacy from "../../pages/privacy/Privacy";

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div
          className={cx(s.wrap, { [s.sidebarOpen]: this.state.sidebarOpen })}
        >
          <Header
            sidebarToggle={() =>
              this.setState({
                sidebarOpen: !this.state.sidebarOpen,
              })
            }
          />
          <main className={s.content}>
            <Routes>
              <Route index path="/main" element={<Dashboard />} />
              <Route path="/typography" element={<Typography />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/components/buttons" element={<Buttons />} />
              <Route path="/components/charts" element={<Charts />} />
              <Route path="/components/icons" element={<Icons />} />
              {/* <Route path="/components/maps" element={<Maps />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
