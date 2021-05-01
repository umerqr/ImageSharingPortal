import { Drawer } from '@material-ui/core';
import React, { lazy } from 'react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopBar from '../TopBar';
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
  const list = () => (
    <div role='presentation'>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
    <div>
      <TopBar />
      <hr className='m-0'></hr>
      <Drawer variant='permanent' open={false} className={`drawer-close`}>
        {list()}
      </Drawer>
      <div className='homepage-container'>
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
