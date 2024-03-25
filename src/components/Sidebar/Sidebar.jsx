import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon';
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';
const links = [
  {
    header: "Dashboard",
    headerLink: "/app/main",
    glyph: "dashboard"
  },
  {
    header: "Typography",
    headerLink: "/app/typography",
    glyph: "typography"
  },
  {
    header: "Tables Basic",
    headerLink: "/app/tables",
    glyph: "tables"
  },
  {
    header: "Notifications",
    headerLink: "/app/notifications",
    glyph: "notifications"
  },
  {
    header: "Components",
    headerLink: "/app/components",
    glyph: "components",
    childrenLinks: [
      {
        name: 'Buttons',
        link: '/app/components/buttons',
      },
      {
        name: 'Charts',
        link: '/app/components/charts',
      },
      {
        name: 'Icons',
        link: '/app/components/icons',
      },
      {
        name: 'Maps',
        link: '/app/components/maps',
      },
    ]
  }
];

const Sidebar = () => (
<nav className={s.root}>
  <header className={s.logo}>
    <Link to="/app/main">
      <Icon glyph="logo" />
    </Link>
  </header>
  <ul className={s.nav}>
    {links.map(link => (
      <LinksGroup
        key={link.header}
        header={link.header}
        headerLink={link.headerLink}
        glyph={link.glyph}
        childrenLinks={link.childrenLinks}
      />
    ))}
  </ul>
</nav>
);

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default connect(mapStateToProps)(Sidebar);
