import React, { lazy, useState } from 'react';
// import PropTypes from 'prop-types';
import './styles.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const AppButton = lazy(() => import(`../AppButton`));
const AppPopper = lazy(() => import(`../AppPopper`));

// fake data generator

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
  const [draggableState, setDraggableState] = useState({
    items: [
      {
        id: `1`,
        url: `https://image.shutterstock.com/shutterstock/photos/384192586/display_1500/stock-photo-group-of-friends-making-barbecue-in-the-backyard-concept-about-good-and-positive-mood-with-friends-384192586.jpg`,
      },
      {
        id: `2`,
        url: `https://images.ctfassets.net/hrltx12pl8hq/2ii9eMNqYTJaZ2zhmMnbt4/6120099cbcd32498f01993efabd7df73/shutterstock_1009843408.jpg?fit=fill&w=480&h=270`,
      },
      {
        id: `3`,
        url: `https://image.shutterstock.com/shutterstock/photos/384192586/display_1500/stock-photo-group-of-friends-making-barbecue-in-the-backyard-concept-about-good-and-positive-mood-with-friends-384192586.jpg`,
      },
      {
        id: `4`,
        url: `https://image.shutterstock.com/shutterstock/photos/384192586/display_1500/stock-photo-group-of-friends-making-barbecue-in-the-backyard-concept-about-good-and-positive-mood-with-friends-384192586.jpg`,
      },
      {
        id: `5`,
        url: `https://image.shutterstock.com/shutterstock/photos/384192586/display_1500/stock-photo-group-of-friends-making-barbecue-in-the-backyard-concept-about-good-and-positive-mood-with-friends-384192586.jpg`,
      },
      {
        id: `6`,
        url: `https://image.shutterstock.com/shutterstock/photos/384192586/display_1500/stock-photo-group-of-friends-making-barbecue-in-the-backyard-concept-about-good-and-positive-mood-with-friends-384192586.jpg`,
      },
    ],
    selected: [],
  });
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
