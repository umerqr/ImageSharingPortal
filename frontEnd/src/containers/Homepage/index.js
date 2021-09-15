import { Drawer } from '@material-ui/core';
import React, { lazy, useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import './styles.css';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  BookOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { logoTransparent } from '../../utils/images';
// import ContentSkeleton from '../ContentHomepage/skeleton';
import ProtectedRoute from '../../components/ProtectedRoute';

const ContentHomepage = lazy(() => import(`../ContentHomepage`));
const Library = lazy(() => import(`../Library`));
const Profile = lazy(() => import(`../Profile`));
const Users = lazy(() => import(`../Users`));
// const NotFoundPage = lazy(() => import(`../NotFoundPage`));
// import PropTypes from 'prop-types';

function Homepage() {
  //   const {} = props;
  const drawerItems = [
    {
      label: 'Dashboard',
      id: 0,
      icon: <DashboardOutlined />,
    },
    { label: 'Library', id: 1, icon: <BookOutlined /> },
    { label: 'Users', id: 2, icon: <UserOutlined /> },
  ];
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    switch (location.pathname) {
      case `/Dashboard`:
      case `/`:
      case ``:
        setSelectedDrawerItem('Dashboard');
        break;
      default:
        setSelectedDrawerItem(location.pathname.replace('/', ''));
        break;
    }
  }, []);
  const onClickDrawerItem = (listItem) => {
    const { label } = listItem;
    if (label === selectedDrawerItem) {
      setSelectedDrawerItem(label);
    } else {
      setSelectedDrawerItem(label);
      history.push(label);
    }
  };
  const list = () => (
    <div role='presentation'>
      <List>
        {drawerItems.map((item) => (
          <ListItem
            onClick={() => onClickDrawerItem(item)}
            button
            key={item.id}
            alignItems='center'
            className={
              selectedDrawerItem === item.label
                ? 'list-item-container list-item-selected '
                : 'list-item-container'
            }
          >
            <ListItemIcon>
              <span>
                <span className='drawer-label-icon'>{item.icon}</span>
                <span
                  className={`pl-1 drawer-list-label ${
                    selectedDrawerItem === item.label &&
                    'drawer-list-label-selected'
                  }`}
                >
                  {isDrawerOpen && item.label}
                </span>
              </span>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div className='main-container'>
      <TopBar
        menuToggleHandler={() => setIsDrawerOpen(!isDrawerOpen)}
        onClickDrawerItem={onClickDrawerItem}
      />
      <hr className='m-0'></hr>
      <Drawer
        variant='permanent'
        open={isDrawerOpen}
        className={
          isDrawerOpen ? `side-drawer drawer-open` : `side-drawer drawer-close`
        }
      >
        <span className='d-flex justify-content-center'>
          <img
            src={logoTransparent}
            alt='/'
            className={isDrawerOpen ? 'logo-styling' : 'closed-logo-styling'}
          />
        </span>
        <Divider />
        {list()}
      </Drawer>
      <div
        className={
          isDrawerOpen ? `homepage-container-open` : 'homepage-container'
        }
      >
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute
              path='/dashboard'
              name='dashboard'
              component={ContentHomepage}
              // render={(props) => (
              //   <Suspense fallback={<ContentSkeleton />}>
              //     <ContentHomepage {...props} />
              //   </Suspense>
              // )}
            />
            {/* <Route
              exact
              path='/'
              render={(props) => (
                <Suspense fallback={<ContentSkeleton />}>
                  <ContentHomepage {...props} />
                </Suspense>
              )}
            /> */}
            <Route path='/profile' render={(props) => <Profile {...props} />} />
            <Route path='/users' render={(props) => <Users {...props} />} />
            <Route path='/library' render={(props) => <Library {...props} />} />
          </Suspense>
        </Switch>
      </div>
    </div>
  );
}

Homepage.propTypes = {};

export default Homepage;
