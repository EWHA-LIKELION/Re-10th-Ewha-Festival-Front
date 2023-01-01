import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Pretendard } from "../Text";
import PartTitle from "./PartTitle";
import Modal from "../Modal/Modal";
import commentdelete from "../../images/detail/commentdelete.svg";
import commentwrite from "../../images/detail/commentwrite.svg";
import { categoryData } from "../../_mock/categoryData";

const BoothComments = () => {
  let { id } = useParams();
  const [isLogin, setIsLogin] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      setIsLogin(false);
    }
    if (token !== null) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (isLogin === true) {
      document.getElementById("input").disabled = false;
    }
    if (isLogin === false) {
      document.getElementById("input").disabled = true;
    }
  });

  const [thisUser, setThisUser] = useState({ id: 1 });
  const [thisBoothUserId, setThisBoothUserId] = useState(
    categoryData.data[id - 1].user,
  );
  const [thisComments, setThisComments] = useState([
    {
      created_at: "22.09.16 12:32",
      content: "선착순으로 배부합니다:) 댓글 달아주세요!",
      user: { nickname: "부스 관리자", id: 1 },
    },
    {
      created_at: "22.09.16 12:32",
      content: "저요!!",
      user: { nickname: "이화연", id: 2 },
    },
    {
      created_at: "22.09.16 12:32",
      content: "저욧",
      user: { nickname: "슬픔이", id: 2 },
    },
    {
      created_at: "22.09.16 12:32",
      content: "저요",
      user: { nickname: "마루", id: 2 },
    },
    {
      created_at: "22.09.16 12:32",
      content: "혹시 00 마감됐나요?",
      user: { nickname: "도비", id: 2 },
    },
  ]);

  useEffect(() => {
    setDeleteModal(false);
    setInputModal(false);
  }, []);

  const detBooth = cUserId => {
    if (thisBoothUserId === cUserId) {
      return true;
    } else {
      return false;
    }
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const [currentId, setCurrentId] = useState("");
  const PreDeleteComment = cId => {
    openDeleteModal();
    setCurrentId(cId);
  };

  const DeleteComment = cId => {
    closeDeleteModal();
  };

  const [newComment, setNewComment] = useState("");
  const [inputModal, setInputModal] = useState(false);
  const openInputModal = () => {
    setInputModal(true);
  };
  const closeInputModal = () => {
    setInputModal(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (newComment === "") {
      setInputModal(true);
    } else {
      setIsAdd(true);
      setNewComment("");
    }
  };

  const endRef = useRef(null);
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    if (isAdd == true) {
      scrollToBottom();
      setIsAdd(false);
    } else {
      setIsAdd(false);
    }
  }, [thisComments]);

  return (
    <>
      <CommentsWrapper>
        <PartTitle title={"댓글 (" + thisComments.length + ")"} />
        {thisComments.map(comment => {
          let time = comment.created_at;
          let dotTime = time.toString();
          return (
            <>
              <CommentContainer>
                <div style={{ display: "flex", position: "relative" }}>
                  <Pretendard
                    size="12px"
                    weight="600"
                    color={
                      detBooth(comment.user.id)
                        ? "var(--orange)"
                        : "var(--green2)"
                    }
                  >
                    {comment.user.nickname}
                  </Pretendard>
                  <Pretendard
                    size="10px"
                    weight="300"
                    color="var(--gray2)"
                    style={{
                      marginLeft: "7px",
                      marginTop: "2px",
                    }}
                  >
                    {dotTime}
                  </Pretendard>
                  {comment.user.id === thisUser.id ? (
                    <Delete
                      src={commentdelete}
                      onClick={() => PreDeleteComment(comment.id)}
                    />
                  ) : null}
                </div>
                <Pretendard
                  size="14px"
                  weight="400"
                  color="var(--black)"
                  style={{ marginTop: "8px" }}
                >
                  {comment.content}
                </Pretendard>
              </CommentContainer>
            </>
          );
        })}
      </CommentsWrapper>
      <Bottom />
      <div ref={endRef} />
      <CommentInputWrapper>
        <CommentInputContainer>
          <CommentInput
            placeholder={
              isLogin ? "댓글을 입력하세요" : "로그인 후 댓글을 입력해보세요"
            }
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            autoComplete="off"
            id="input"
          />
          {isLogin ? (
            <WriteBtn onClick={e => onSubmit(e)}>
              <Write src={commentwrite} />
            </WriteBtn>
          ) : null}
        </CommentInputContainer>
      </CommentInputWrapper>
      {inputModal ? (
        <Modal
          isOne={true}
          open={openInputModal}
          close={closeInputModal}
          header="댓글 내용 없음"
          subtext="-"
          maintext="댓글 내용을 입력해주세요."
          onClick={() => closeInputModal()}
        />
      ) : null}
      {deleteModal ? (
        <Modal
          isOne={false}
          open={deleteModal}
          close={closeDeleteModal}
          header="댓글 삭제"
          subtext="삭제된 댓글은 되돌릴 수 없습니다."
          maintext="댓글을 삭제하시겠습니까?"
          onClick={() => DeleteComment(currentId)}
        />
      ) : null}
    </>
  );
};

export default BoothComments;

const Bottom = styled.div`
  width: 100%;
  height: 70px;
`;

const CommentsWrapper = styled.div`
  position: relative;
`;

const CommentContainer = styled.div`
  width: calc(100% - 40px);
  min-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 15px;
  background-color: var(--gray0);
  border-radius: 10px;
`;

const Delete = styled.img`
  position: absolute;
  right: 5px;
  width: 10px;
  height: 12.5px;
  -webkit-user-drag: none;
  &:hover {
    cursor: pointer;
  }
`;

const CommentInputWrapper = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 25px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid var(--gray);
`;

const CommentInputContainer = styled.div`
  width: calc(100% - 40px);
  height: 35px;
  margin: 0 auto;
  background-color: var(--gray0);
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
`;

const CommentInput = styled.input`
  margin-left: 15px;
  width: calc(100% - 50px);
  height: 30px;
  background-color: transparent;
  border: 0;
  &:focus {
    outline: none;
  }
  font-family: "Pretendard";
  font-weight: 300;
  font-size: 14px;
`;

const WriteBtn = styled.button`
  width: 14px;
  height: 13.5px;
  position: absolute;
  right: 15px;
  background-color: transparent;
  border: 0;
`;

const Write = styled.img`
  width: 14px;
  height: 13.5px;
  -webkit-user-drag: none;
`;
