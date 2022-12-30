import MyManager from "./MyManager";
import MyUser from "./MyUser";
import React, { useState } from "react";

import { useAppSelector } from "../../redux/store";

import { useNavigate } from "react-router-dom";
const Mypage = () => {
  const navigate = useNavigate();

  const [isBooth2, setBooths2] = useState();

  const { username, id, nickname, isBooth, isTf, boothId } = useAppSelector(
    state => state.user,
  );

  console.log("테스트", username, id, nickname, isBooth, isTf, boothId);

  if (isBooth2 == true) {
    console.log("부스관리자");
    navigate("/mypage/mymanager");
    return <MyManager />;
  } else {
    console.log("일반유저");
    navigate("/mypage/myuser");
    return <MyUser />;
  }
};

export default Mypage;
