import {useState} from "react";
import cx from "classnames";
import { useRoutes } from "react-router-dom";
import s from "./Layout.module.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from '@/router/index.jsx'


const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const element = useRoutes (routes);
  return (
    <div className={s.root}>
      <Sidebar />
      <div
        className={cx(s.wrap, { [s.sidebarOpen]: sidebarOpen })}
      >
        <Header
          sidebarToggle={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />
        <main className={s.content}>
         {element}
      
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
