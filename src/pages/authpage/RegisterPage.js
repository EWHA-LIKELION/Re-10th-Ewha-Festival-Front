import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
//images
import title from "../../images/main/title.svg";
import { FiUser } from "react-icons/fi";
import { MdOutlineLockOpen } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsFlower2 } from "react-icons/bs";
import { MdOutlineVpnKey } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
// 모달창
import RegisterModal from "../../components/Register/RegisterModal";
// 유저 정보 관련
import { useAppDispatch } from "../../redux/store";

const RegisterPage = () => {
  // 유저 리덕스
  const dispatch = useAppDispatch();

  // 입력 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [secreteWord, setSecreteWord] = useState("");

  // 비밀번호 체크 아이콘 색상 관리
  const [checkColor, setCheckColor] = useState("#EAEAEA");

  // 모달창 관리
  const [modal, setModal] = useState(false);

  // 회원가입 함수
  const Register = e => {
    e.preventDefault();

    alert("해당 사이트는 회원가입이 불가능 합니다.");
  };

  // 동일한 비밀번호 입력시 색 변경 함수
  const ChangeBtn = () => {
    password === password2 && password !== ""
      ? setCheckColor("#007A28")
      : setCheckColor("#EAEAEA");
  };

  return (
    <>
      {modal ? <RegisterModal setModal={setModal} /> : null}
      <RegisterWrapper onSubmit={Register}>
        <object type="image/svg+xml" data={title} style={{ marginTop: "98px" }}>
          <Title src={title} />
        </object>

        <RegisterForm>
          <InputWrapper>
            <IdWrapper>
              <FiUser className="idIcon" />
              <input
                value={id}
                placeholder="아이디"
                onChange={e => setId(e.target.value)}
              />
            </IdWrapper>
            <PwWrapper>
              <MdOutlineLockOpen className="lockIcon" />
              <input
                value={password}
                className="PW"
                placeholder="비밀번호"
                type="password"
                onChange={e => setPassword(e.target.value)}
                onKeyUp={ChangeBtn}
              />
            </PwWrapper>
            <PwWrapper>
              <MdOutlineLockOpen className="lockIcon" />
              <input
                value={password2}
                className="PW2"
                placeholder="비밀번호 확인"
                type="password"
                onChange={e => setPassword2(e.target.value)}
                onKeyUp={ChangeBtn}
              />
              <IoMdCheckmarkCircle
                style={{
                  width: "16px",
                  marginLeft: "16px",
                  color: checkColor,
                }}
              />
            </PwWrapper>
            <NameWrapper>
              <BsFlower2 className="flowerIcon" />
              <input
                value={name}
                placeholder="닉네임"
                onChange={e => setName(e.target.value)}
              />
            </NameWrapper>
            <SecreteWrapper>
              <MdOutlineVpnKey className="keyIcon" />
              <input
                value={secreteWord}
                placeholder="비밀단어"
                onChange={e => setSecreteWord(e.target.value)}
              />
              <AiFillInfoCircle
                style={{
                  cursor: "pointer",
                  width: "16px",
                  marginLeft: "16px",
                  color: " #FBB03B",
                }}
                onClick={() => {
                  setModal(true);
                }}
              />
            </SecreteWrapper>
          </InputWrapper>
          <RegisterBtn type="submit">회원가입</RegisterBtn>
        </RegisterForm>
        <GoLogin>
          <p style={{ marginRight: "7px" }}>이미 계정이 있나요?</p>
          <Link to="/login">로그인 하기</Link>
        </GoLogin>
      </RegisterWrapper>
      <Footer>Copyright ⓒ RE:WHA. All Rights Reserved.</Footer>
    </>
  );
};
export default RegisterPage;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 27px; //47px;
`;
const Title = styled.img``;
const RegisterForm = styled.form`
  margin-top: 38px; //58px
  div {
    width: 294px;
  }
  input {
    height: 41px;
    padding-left: 49px;

    background: #f9f9f9;
    border-radius: 8px;
    border-style: none;
    outline: none;

    font-weight: 400;
    font-size: 14px;
  }
`;
const InputWrapper = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const IdWrapper = styled.div`
  input {
    width: 294px;
  }
  .idIcon {
    width: 18px;
    height: 18px;
    position: absolute;
    z-index: 2;
    margin: 11px 0 0 12px;
    color: #979797;
  }
`;
const PwWrapper = styled.div`
  input {
    margin-top: 16px;
  }
  .lockIcon {
    width: 18px;
    height: 18px;
    position: absolute;
    z-index: 2;
    margin: 27px 0 0 12px;
    color: #979797;
  }
  .PW {
    width: 294px;
  }
  .PW2 {
    width: 262px;
  }
`;
const NameWrapper = styled.div`
  margin-top: 16px;
  input {
    width: 294px;
  }
  .flowerIcon {
    width: 18px;
    height: 18px;
    color: #797878;
    position: absolute;
    z-index: 2;
    margin: 11px 0 0 12px;
    opacity: 80%;
  }
`;
const SecreteWrapper = styled.div`
  margin: 16px 0 26px 0;
  input {
    width: 262px;
  }
  .keyIcon {
    width: 18px;
    height: 18px;
    color: #797878;
    position: absolute;
    z-index: 2;
    margin: 11px 0 0 12px;
    opacity: 80%;
  }
`;
const RegisterBtn = styled.button`
  cursor: pointer;
  width: 294px;
  height: 41px;

  background: linear-gradient(90deg, #004628 0%, #107047 100%);
  border-radius: 8px;
  border-style: none;

  font-weight: 600;
  font-size: 16px;
  color: #fffef5;
`;
const GoLogin = styled.div`
  margin-top: 26px;
  display: flex;

  font-weight: 400;
  font-size: 12px;
  color: #979797;
  a {
    color: #979797;
    text-decoration-line: underline;
  }
`;
const Footer = styled.div`
  width: 100%;
  height: 59px;
  margin-top: 157px;
  vertical-align: baseline;

  text-align: center;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  color: #a5a5a5;
`;
