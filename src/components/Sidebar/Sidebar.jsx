import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon';
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';
import links from '@/router';

const Sidebar = () => (
<nav className={s.root}>
  <header className={s.logo}>
    <Link to="/app/main">
      <Icon glyph="logo" />
    </Link>
  </header>
  <ul className={s.nav}>
    {links.map(link => {
      return (
        <LinksGroup
          key={link.title}
          header={link?.title}
          headerLink={link.headerLink}
          glyph={link.glyph}
          childrenLinks={link.children}
        />
      )
    })}
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
