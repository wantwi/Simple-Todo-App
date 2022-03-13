import styled from "styled-components";

import Bg from "./image/bg.png";

export const DragIconWrapper = styled.div`
  display: inline-block;
  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    padding-right: 1rem;
  }
`;
export const ListContainer = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  margin: 0.3rem auto;
  width: 80%;
  padding: 20px;
  border-radius: 0.2rem;
`;
export const ListItem = styled.div`
  color: #444444;
  padding: 0.3rem;
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  font-size: 12px;
  height: 36px;
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: none;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  background: white;
`;

export const RemoveItem = styled.span`
  color: red;
  font-weight: bold;
  float: right;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const StarItem = styled.span`
  color: gold;
  font-weight: bold;
  float: right;
  margin-right: 10px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  display: grid;

  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  gap: 0px;
  height: 100vh;
`;

export const Box1 = styled.div`
  background-color: #fff;
  grid-row-start: 1;
  grid-column-start: 1;

  grid-row-end: 4;
  grid-column-end: 2;
`;

export const Box2 = styled.div`
  background-color: #97bf75;
  grid-row-start: 1;
  grid-column-start: 2;
  background: url(${Bg});
  grid-row-end: 4;
  grid-column-end: 6;
  position: relative;
`;

export const Hwrap = styled.div`
  margin: 20px auto 20px auto;
`;

export const H4 = styled.h4`
  color: #fff;
`;
export const Hspan = styled.span`
  font-size: 11px;
  color: #fff;
`;

export const InputWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  background: white;
  padding: 5px 5px;
  width: 80%;
  oveflow: hidden;
  border-radius: 0.2rem;
`;

export const BtnSpan = styled.span`
  padding: 5px 0px;
  margin-left: 3px;
  &:hover {
    cursor: pointer;
  }
`;

export const ListWrapper = styled.div`
  min-height: 300px;
  max-height: 350px;
  padding-bottom: 0px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: "8px";
  }

  &::-webkit-scrollbar-track {
    box-shadow: "nset 0 0 6px red";
  }

  /* &:hover {
    overflow-y: scroll;
  } */
`;

export const MenuItemWrapper = styled.div`
  margin-top: 55px;
`;

export const MenuItem = styled.div`
  height: 30px;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 5px 15px;
  text-transform: capitalize;
  &:hover {
    background: #e1e2e3;
    cursor: pointer;
  }
`;
