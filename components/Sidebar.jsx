import React, { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import {
  MdMenu,
  MdHome,
  MdSort,
  MdAccountTree,
  MdAltRoute,
} from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  console.log(router);

  const content = [
    { title: 'Home', link: '/', icon: <MdHome /> },
    { title: 'Sorting', link: '/sorting', icon: <MdSort /> },
    { title: 'Pathfinding', link: '/pathfinding', icon: <MdAltRoute /> },
    {
      title: 'Tree Traversal',
      link: '/treeTraversal',
      icon: <MdAccountTree />,
    },
  ];

  const [open, setOpen] = useState(true);
  return (
    <div className={`${styles.sidebar} ${!open && styles.sidebarClosed}`}>
      <div className={styles.menu}>
        <MdMenu
          size={26}
          className={styles.menuIcon}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className={styles.items}>
        {content.map((item, key) => (
          <Link
            key={key}
            href={item.link}
            className={`${styles.item} ${
              item.link === router.pathname && styles.itemActive
            }`}
          >
            <div>{item.icon}</div>
            <p
              className={`${!open ? styles.textInvisible : styles.textVisible}`}
            >
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
