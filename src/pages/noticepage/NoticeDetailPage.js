import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
// components
import TitleBar from "../../components/TitleBar";
import Footer from "../../components/Footer/Footer";
import DeleteButton from "../../components/NoticePage/DeleteButton";
import ModifyButton from "../../components/NoticePage/ModifyButton";
import Modal from "../../components/Modal/Modal";
import { Pretendard } from "../../components/Text";

export function NoticeDetailPage() {
  const [notice, setNotice] = useState({
    id: 1,
    title: "공지 제목",
    created_at: "22.09.14 22:10",
    content: "공지 내용",
  });
  let { id } = useParams();

  // 유저 tf 여부
  const isTf = useAppSelector(state => state.user.isTf);

  // 수정 페이지 이동
  function Update(e) {
    window.location.href = "/update";
  }
  // 공지 메인 페이지 이동
  function NoticeMain(e) {
    window.location.href = "/notice";
  }

  // 모달
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box>
        <Pretendard>
          <TitleBar>
            <span style={{ color: "var(--green1)" }}>공</span>
            <span style={{ color: "var(--green2)" }}>지</span>
            <span style={{ color: "var(--green3)" }}>사항</span>
          </TitleBar>
          <NoticeTitle>
            <p class="title">{"[공지]" + " " + notice.title}</p>
          </NoticeTitle>
          <Line />
          <NoticeInfo>
            <div style={{ display: "flex", float: "left" }}>
              <p class="writer">TF 팀</p>
            </div>
            <div style={{ display: "flex", float: "right" }}>
              <p class="createdAt">{notice.created_at}</p>
            </div>
          </NoticeInfo>
          <NoticeContent style={{}}>
            <p class="content">
              {notice?.content &&
                (notice?.content.includes("\n") ? (
                  <>
                    {notice?.content.split("\n").map(line => {
                      return (
                        <span>
                          {line}
                          <br />
                        </span>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <span>{notice?.content}</span>
                  </>
                ))}
            </p>
          </NoticeContent>
          <Line style={{ marginBottom: "5%" }} />
        </Pretendard>
        {isTf ? (
          <ButtonBox>
            <DeleteButton onClick={openModal}>삭제</DeleteButton>
            <ModifyButton onClick={Update}>수정</ModifyButton>
          </ButtonBox>
        ) : null}
        <Modal
          open={modalOpen}
          close={closeModal}
          header="공지 삭제"
          subtext="삭제 된 글은 다시 불러올 수 없습니다."
          maintext="공지 글을 삭제하시겠습니까?"
          onClick={() => {
            alert("삭제 완료");
            closeModal();
          }}
        ></Modal>
        <Footer />
      </Box>
    </>
  );
}

const NoticeTitle = styled.div`
  margin: 8% 10% 3%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: justify;
  height: 100%;
`;
const NoticeInfo = styled.div`
  box-sizing: border-box;
  height: 10px;
  margin: 3% 10% 6%;
  font-family: "Pretendard";
  color: var(--gray2);
  font-weight: 300;
  font-size: 12px;
`;
const NoticeContent = styled.div`
  margin: 0 10% 5%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: justify;
  line-height: 22px;
  height: 100%;
`;

const Box = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: auto !important;
  background-color: #ffffff;
`;

const Line = styled.div`
  border: 1px solid var(--gray);
  width: 85%;
  margin: 0 auto;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-bottom: 10%;
`;

export default NoticeDetailPage;
