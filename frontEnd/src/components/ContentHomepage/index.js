import React, { lazy, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './styles.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListDataAction,
  fetchUserListDataAction,
  postListDataAction,
} from './actions';
const AppButton = lazy(() => import(`../AppButton`));
const AppPopper = lazy(() => import(`../AppPopper`));

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  display: `flex`,
  overflow: `auto`,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function ContentHomepage(props) {
  const [showAddArea, setShowAddArea] = useState(false);
  const [activeImage, setActiveImage] = useState(``);
  const [anchorEl, setAnchorEl] = useState(null);
  const contentHomepageReducer = useSelector(
    (state) => state.contentHomepageReducer
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userListData]);
  useEffect(() => {
    if (listData) {
      setDraggableState({ ...draggableState, items: listData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } else {
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
    <div>
      <div className='d-flex justify-content-center'>
        <div>
          <AppButton label='Add Media' onClick={() => setShowAddArea(true)} />
        </div>
      </div>
      <div onMouseLeave={() => handleMouseLeave()}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId='droppable2' direction={'horizontal'}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className='mb-5'
              >
                {draggableState.selected.length === 0 &&
                  `Please Add Media here`}
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
            <Droppable droppableId='droppable' direction={'horizontal'}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
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
          )}
        </DragDropContext>
        <AppButton
          label='Update Images'
          onClick={() => dispatch(postListDataAction(draggableState.selected))}
        />
        <AppPopper
          subItem={activeImage}
          handleMouseLeave={handleMouseLeave}
          anchorEl={anchorEl}
        />
      </div>
    </div>
  );
}

ContentHomepage.propTypes = {};

export default ContentHomepage;
