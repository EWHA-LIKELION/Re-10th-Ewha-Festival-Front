import styled, { css } from "styled-components";
import { useState, useEffect } from "react";

import { PyeongChang_Peace, Pretendard } from "../../components/Text";

import Footer from "../../components/Footer/Footer";
import Map from "../../images/map.svg";
import TitleBar from "../../components/TitleBar";
import pinbtn from "../../images/trash/pinbtn.svg";
const TrashPage = () => {
  return (
    <>
      <TitleBar>
        <span style={{ color: "var(--green1)" }}>쓰레</span>
        <span style={{ color: "var(--green2)" }}>기통 </span>
        <span style={{ color: "var(--green3)" }}>지도</span>
      </TitleBar>
      <Tbox>
        <div>
          <PyeongChang_Peace>다시쓰는</PyeongChang_Peace>
        </div>
        <PyeongChang_Peace>
          이화의 <span>초록</span>
        </PyeongChang_Peace>
      </Tbox>
      <Mapimg>
        <img id="pin1" src={pinbtn} />
        <img id="pin2" src={pinbtn} />
        <img id="pin3" src={pinbtn} />
        <img id="pin4" src={pinbtn} />
        <img id="pin5" src={pinbtn} />
      </Mapimg>
      <LocationBox></LocationBox>

      <Footer />
    </>
  );
};

export default TrashPage;

const Tbox = styled.div`
  width: fit-content;
  margin: 32px auto 0;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  span {
    color: #007a28;
  }
  div {
    width: fit-content;
    margin: auto;
  }
`;

const Mapimg = styled.div`
  width: 347px;
  height: 350px;
  margin: auto;
  background-image: url(${Map});
  background-repeat: no-repeat;
  background-size: 347px 350px;

  img {
    position: absolute;
    width: 17px;
  }
  #pin1 {
    top: 325px;
    left: 215px;
  }
  #pin2 {
    top: 345px;
    left: 180px;
  }
  #pin3 {
    top: 377px;
    left: 160px;
  }
  #pin4 {
    top: 400px;
    left: 135px;
  }
  #pin5 {
    top: 417px;
    left: 260px;
  }

  #mapimg {
    display: block;
  }
`;

const LocationBox = styled.div`
  margin: auto;
  width: 335px;
  height: 120px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.075);
`;
