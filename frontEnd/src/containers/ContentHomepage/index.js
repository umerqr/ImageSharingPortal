/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './styles.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListDataAction,
  fetchUserListDataAction,
  postListDataAction,
} from './actions';
import AppLabel from '../../components/AppLabel';
import { AuthContext } from '../../containers/auth/authContext';
import {
  getItemStyle,
  getListStyle,
  move,
  reorder,
} from '../../utils/helpers/dragHelpers';
const AppButton = lazy(() => import(`../../components/AppButton`));
const AppPopper = lazy(() => import(`../../components/AppPopper`));

function ContentHomepage(props) {
  const [showAddArea, setShowAddArea] = useState(false);
  const [activeImage, setActiveImage] = useState(``);
  const [anchorEl, setAnchorEl] = useState(null);
  const contentHomepageReducer = useSelector(
    (state) => state.contentHomepageReducer
  );

  const auth = useContext(AuthContext);
  const { listData, userListData } = contentHomepageReducer;
  const dispatch = useDispatch();
  const [draggableState, setDraggableState] = useState({
    items: [],
    selected: [],
  });

  useEffect(() => {
    dispatch(fetchListDataAction());
    dispatch(fetchUserListDataAction());
  }, []);
  useEffect(() => {
    if (userListData) {
      setDraggableState({ ...draggableState, selected: userListData });
    }
  }, [userListData]);
  useEffect(() => {
    if (listData) {
      setDraggableState({ ...draggableState, items: listData });
    }
  }, [listData]);
  const handleMouseEnter = (event, itemName) => {
    handleTabButton(event, itemName);
    const { currentTarget } = event;
    setAnchorEl(currentTarget);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTabButton = (e, url) => {
    setActiveImage(url);
    handleClick(e);
  };
  const id2List = {
    droppable: 'items',
    droppable2: 'selected',
  };
  const getList = (id) => draggableState[id2List[id]];
  const onDragEndHandler = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    // Checks if its the same div, if so it reorders the items
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { ...draggableState, items };

      if (source.droppableId === 'droppable2') {
        state = { ...draggableState, selected: items };
      }
      setDraggableState(state);
    }
    // if its not the same div it moves the items
    else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setDraggableState({
        ...draggableState,
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };
  return (
    <>
      <div className='d-flex justify-content-center'>
        <AppLabel
          className='welcome-label-styling'
          label={`Welcome to the Image Portal ${auth.user.name}`}
        />
      </div>
      <div className='d-flex justify-content-end'>
        <div>
          <AppButton
            label='Update Images'
            className='mt-2 mr-2'
            onClick={() =>
              dispatch(postListDataAction(draggableState.selected))
            }
            disabled={(() => {
              if (userListData === draggableState.selected) return true;
            })()}
          />
          <AppButton
            className='mt-5'
            label='Add Media'
            onClick={() => setShowAddArea(true)}
          />
        </div>
      </div>
      <div className='mt-5' onMouseLeave={() => handleMouseLeave()}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId='droppable2' direction={'horizontal'}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className='mb-5'
              >
                {draggableState.selected.length === 0 && (
                  <div className='no-image-styling'>
                    <AppLabel label='Please Add Media here' />
                  </div>
                )}
                {draggableState.selected.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <img
                          className='array-image-styling'
                          key={item.id}
                          src={item.url}
                          alt='I'
                          onMouseLeave={() => handleMouseLeave()}
                          onMouseEnter={(e) => handleMouseEnter(e, item.url)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                <div className='image-placeholder-styling'>
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          {showAddArea && (
            <>
              <div className='d-flex justify-content-center'>
                <AppLabel
                  className='add-image-label-styling'
                  label='Please Select images from the list below.'
                />
              </div>
              <Droppable droppableId='droppable' direction={'horizontal'}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {draggableState.items.length === 0 && (
                      <div className='no-image-styling'>
                        <AppLabel label='There are no more images to select from.' />
                      </div>
                    )}
                    {draggableState.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <img
                              className='array-image-styling'
                              key={item.id}
                              src={item.url}
                              alt='I'
                              onMouseLeave={() => handleMouseLeave()}
                              onMouseEnter={(e) =>
                                handleMouseEnter(e, item.url)
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <div className='image-placeholder-styling'>
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </>
          )}
        </DragDropContext>

        <AppPopper
          subItem={activeImage}
          handleMouseLeave={handleMouseLeave}
          anchorEl={anchorEl}
        />
      </div>
    </>
  );
}

ContentHomepage.propTypes = {};

export default ContentHomepage;
