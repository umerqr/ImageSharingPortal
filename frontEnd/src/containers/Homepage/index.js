import { Drawer } from '@material-ui/core';
import React, { lazy, useState } from 'react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import './styles.css';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const ContentHomepage = lazy(() => import(`../ContentHomepage`));
// const NotFoundPage = lazy(() => import(`../NotFoundPage`));
// import PropTypes from 'prop-types';

function Homepage(props) {
  //   const {} = props;
  const drawerItems = [{ label: 'Dashboard', id: 0 }];
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const list = () => (
    <div role='presentation'>
      <List>
        {drawerItems.map((item, index) => (
          <ListItem button key={item.id}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <span>
                  <InboxIcon></InboxIcon>
                  {isDrawerOpen && item.label}
                </span>
              ) : (
                <MailIcon />
              )}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div className='main-container'>
      <TopBar menuToggleHandler={() => setIsDrawerOpen(!isDrawerOpen)} />
      <hr className='m-0'></hr>
      <Drawer
        variant='permanent'
        open={isDrawerOpen}
        className={
          isDrawerOpen ? `side-drawer drawer-open` : `side-drawer drawer-close`
        }
      >
        {list()}
      </Drawer>
      <div
        className={
          isDrawerOpen ? `homepage-container-open` : 'homepage-container'
        }
      >
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path='/homepage' component={ContentHomepage} />
            <Route path='/' component={ContentHomepage} />
          </Suspense>
        </Switch>
      </div>
    </div>
  );
}

Homepage.propTypes = {};

export default Homepage;
