import React, { useEffect, useState } from "react";
import List from "./data";
import uuid from "react-uuid";
import {
  Box1,
  Box2,
  ListContainer,
  ListItem,
  RemoveItem,
  Wrapper,
  H4,
  Hspan,
  Hwrap,
  InputWrapper,
  BtnSpan,
  ListWrapper,
  MenuItem,
  MenuItemWrapper,
  StarItem,
} from "./styles";
import { DragHandle } from "./partials/DragHandle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { TiTrash } from "react-icons/ti";
import { TiStar } from "react-icons/ti";
import Localbase from "localbase";

let db = new Localbase("db");

const listItems = [
  {
    id: 0,
    name: "Favorite",
  },
  {
    id: 1,
    name: "work",
  },
  {
    id: 2,
    name: "school",
  },
  {
    id: 3,
    name: "church",
  },
];

const App = () => {
  const list = List.getList();

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState("");
  const [textVal, setTextVal] = useState("");
  const [favs, setfavs] = useState([]);

  const getItems = (name) => {
    setSelected(name);
    db.collection(`${name}`)
      .get()
      .then((list) => {
        setItems(list);
      });
  };

  const saveItem = (data) => {
    db.collection(`${selected}`).add(data);
  };

  const handleKeyDown = (event) => {
    const { name, value } = event.target;

    if (event.key === "Enter") {
      setItems((prev) => [{ id: uuid(), title: textVal }, ...prev]);

      saveItem({ id: uuid(), title: textVal });

      setTextVal("");
    }
  };

  const addToList = () => {
    setItems((prev) => [{ id: uuid(), title: textVal }, ...prev]);
    saveItem({ id: uuid(), title: textVal });
    setTextVal("");
  };

  const addToFav = (id) => {
    let favEx = favs.filter((x) => x.id.toString() === id.toString());
    console.log({ favEx });

    if (favEx.length > 0) {
      console.log({ favEx });
    } else {
      let data = items.find((x) => x.id === id);
      data.isFav = true;

      db.collection("Favorite")
        .add(data)
        .then((res) => {
          db.collection(`${selected}`).doc({ id: id }).set(data);
        });
    }
  };

  const remove = (id) => {
    console.log(id);
    db.collection(`${selected}`).doc({ id }).delete();
    //getItems(`${selected}`);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  useEffect(() => {
    db.collection(`Favorite`)
      .get()
      .then((list) => {
        console.log(list);
        setfavs(list);
      });
  }, []);

  return (
    <div>
      <Wrapper>
        <Box1>
          <MenuItemWrapper>
            {listItems.map((x) => (
              <MenuItem
                onClick={() => getItems(x.name)}
                key={x.id}
                style={{ background: selected === x.name ? "#e1e2e3" : "#fff" }}
              >
                {x.name}
              </MenuItem>
            ))}
          </MenuItemWrapper>
        </Box1>
        <Box2>
          <ListContainer>
            <Hwrap>
              <H4>Today</H4>
              <Hspan>Monday, March 10</Hspan>
            </Hwrap>

            <DragDropContext
              onDragEnd={(props) => {
                const srcI = props.source.index;
                const desI = props.destination.index;
                items.splice(desI, 0, items.splice(srcI, 1)[0]);

                console.log("items state", items);
              }}
            >
              <Droppable droppableId="droppable-1">
                {(provided, snapshot) => (
                  <ListWrapper
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: snapshot.isDraggingOver ? "" : "",
                    }}
                    {...provided.droppableProps}
                  >
                    {items
                      ? items.map((item, i) => (
                          <Draggable
                            key={i + 1}
                            draggableId={`draggable-${i + 1}`}
                            index={i}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  boxShadow: snapshot.isDragging
                                    ? "0 0 1 1 0.4rem #666"
                                    : "none",
                                }}
                              >
                                <DragHandle {...provided.dragHandleProps} />

                                {item.title}

                                <RemoveItem
                                  title={"Remove " + item.title}
                                  onClick={() => remove(item.id)}
                                >
                                  <TiTrash style={{ fontSize: 15 }} />
                                </RemoveItem>

                                {selected !== "Favorite" ? (
                                  <StarItem
                                    style={{
                                      color: item?.isFav ? "gold" : "#ddd",
                                    }}
                                    onClick={() => addToFav(item.id)}
                                    title={"Add " + item.title + " to favorite"}
                                  >
                                    <TiStar />
                                  </StarItem>
                                ) : null}
                              </ListItem>
                            )}
                          </Draggable>
                        ))
                      : "You have no task"}
                    {provided.placeholder}
                  </ListWrapper>
                )}
              </Droppable>
            </DragDropContext>
          </ListContainer>

          <ListContainer>
            <InputWrapper>
              <BtnSpan onClick={addToList}>+</BtnSpan>{" "}
              <input
                placeholder="Add a task"
                name="text"
                onKeyDown={handleKeyDown}
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
              />
            </InputWrapper>
          </ListContainer>
        </Box2>
      </Wrapper>

      {/* <div hidden style={{ marginTop: "60px" }}>

        <input value={textVal} onChange={(e) => setTextVal(e.target.value)} type="text" />

        <button onClick={addToList}>Add</button>

      </div>
      <Container>

        <Main>
          
            

         
        </Main>
        <SideBar>SideBar</SideBar>




      </Container> */}
    </div>
  );
};

export default App;
