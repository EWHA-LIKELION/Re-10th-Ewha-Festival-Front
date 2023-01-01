import React, { useEffect, useState } from "react";
import styled from "styled-components";

// import font
import { Pretendard } from "../Text";

// import image
import emptycheck from "../../images/edit/emptycheck.svg";
import fullcheck from "../../images/edit/fullcheck.svg";

// Menudata component
const MenuData = ({ handleCheck, props, checked }) => {
  let price = props.price;
  let commaPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <>
      <Wrapper key={props.id} id={props.id}>
        <TextContainer
          key={props.id}
          id={props.id}
          className={props.is_soldout ? "soldout" : "selling"}
        >
          <Pretendard weight="500" size="14px">
            <MenuName key={props.id} id={props.id}>
              {props.menu}
            </MenuName>
          </Pretendard>
          <Pretendard weight="300" size="13px">
            <MenuPrice key={props.id} id={props.id}>
              {commaPrice}원
            </MenuPrice>
          </Pretendard>
        </TextContainer>
        {checked == props.id ? (
          <img src={fullcheck} id={props.id} />
        ) : (
          <img src={emptycheck} id={props.id} />
        )}
      </Wrapper>
    </>
  );
};

const MenuItem = props => {
  // useState
  const [checked, setChecked] = useState(null);
  const [menus, setMenus] = useState([
    { id: 1, price: 100, menu: "메뉴 이름" },
    { id: 2, price: 100, menu: "메뉴 이름" },
    { id: 3, price: 100, menu: "메뉴 이름" },
  ]);
  const [id, setId] = useState(null);

  // checked menu id parent에 보내기
  const handleCheck = e => {
    setChecked(e.target.id);
    props.setItem(e.target.id);
  };

  return (
    <>
      {menus.map(props => (
        <>
          <div key={props.id} id={props.id} onClick={handleCheck}>
            <MenuData
              key={props.id}
              id={props.id}
              props={props}
              checked={checked}
              onClick={handleCheck}
              handleCheck={handleCheck}
            />
          </div>
        </>
      ))}
    </>
  );
};

export default MenuItem;

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  border: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  padding: 30px;

  .soldout {
    color: var(--gray2);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const MenuName = styled.div`
  margin-right: 8px;
  margin-bottom: 2px;
  font-weight: 500;
`;

const MenuPrice = styled.div`
  font-size: 13px;
  font-weight: 300;
`;
