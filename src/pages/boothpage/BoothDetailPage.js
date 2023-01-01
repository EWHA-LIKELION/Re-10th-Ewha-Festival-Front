import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PyeongChang_Peace } from "../../components/Text";
import PartTitle from "../../components/BoothDetail/PartTitle";
import BoothNotice from "../../components/BoothDetail/BoothNotice";
import BoothInfo from "../../components/BoothDetail/BoothInfo";
import BoothMenu from "../../components/BoothDetail/BoothMenu";
import BoothComments from "../../components/BoothDetail/BoothComments";
import ImgModal from "../../components/BoothDetail/ImgModal";

import greenheart from "../../images/greenheart.svg";
import heart from "../../images/heart.svg";

import { categoryData } from "../../_mock/categoryData";

import img1 from "../../images/_mock/img1.png";
import img2 from "../../images/_mock/img2.png";
import img3 from "../../images/_mock/img3.jpg";
import img4 from "../../images/_mock/img4.jpg";
import img5 from "../../images/_mock/img5.jpg";
import img6 from "../../images/_mock/img6.jpg";

import booththumnail from "../../images/_mock/img6.jpg";

const BoothDetailPage = () => {
  let { id } = useParams();
  const [booth, setBooth] = useState(categoryData.data[id - 1]);

  useEffect(() => {
    setImgModal(false);
    setNotice(false);
    setInfo(false);
  }, []);

  const Like = id => {
    const token = localStorage.getItem("token");
    if (token) {
      setBooth({ ...booth, is_liked: true });
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  const unLike = id => {
    console.log("취소");
    setBooth({ ...booth, is_liked: false });
  };

  const [imgModal, setImgModal] = useState(false);
  const closeModal = () => {
    setImgModal(false);
  };

  const [notice, setNotice] = useState(false);
  const handleNotice = () => {
    setNotice(!notice);
  };
  const [noticeString, setNoticeString] = useState("");

  const [info, setInfo] = useState(false);
  const handleInfo = () => {
    setInfo(!info);
  };
  const [infoString, setInfoString] = useState("");

  const [images, setImages] = useState([img1, img2, img3, img4, img5, img6]);

  const [src, setSrc] = useState("");
  const openModal = src => {
    setSrc(src);
    setImgModal(true);
  };

  useEffect(() => {
    setNoticeString(booth.notice);
    setInfoString(booth.description);
  }, [booth]);

  return (
    <>
      <Wrapper>
        <MainImage onClick={() => openModal(booththumnail)}>
          <MainImg src={booththumnail} />
        </MainImage>
        <WhiteWrapper>
          <TitleWrapper>
            <TitleContainer>
              <PyeongChang_Peace size="22px" weight="700" color="var(--green3)">
                {booth.name}
              </PyeongChang_Peace>
            </TitleContainer>
            {booth.is_liked ? (
              <Heart src={greenheart} onClick={() => unLike(id)} />
            ) : (
              <Heart src={heart} onClick={() => Like(id)} />
            )}
          </TitleWrapper>
          <BoothNotice
            noticeString={noticeString}
            notice={notice}
            handleNotice={handleNotice}
          />
          <BoothInfo
            infoString={infoString}
            info={info}
            handleInfo={handleInfo}
          />
          <BoothMenu />
          {images &&
            (images.length === 0 ? (
              <ImageWrapper>
                <PartTitle title="사진" />
                <ImageContainer style={{ height: "15px" }}></ImageContainer>
              </ImageWrapper>
            ) : (
              <ImageWrapper>
                <PartTitle title="사진" />
                <ImageContainer>
                  {images.map(img => {
                    return (
                      <>
                        <ImgRect onClick={() => openModal(img)}>
                          <Img src={img} />
                        </ImgRect>
                      </>
                    );
                  })}
                </ImageContainer>
              </ImageWrapper>
            ))}
          <BoothComments />
        </WhiteWrapper>
      </Wrapper>
      {imgModal ? <ImgModal src={src} closeModal={closeModal} /> : null}
    </>
  );
};

export default BoothDetailPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.div`
  width: 100%;
  height: auto;
  @media all and (min-width: 600px) {
    height: 400px;
  }
  @media (orientation: landscape) {
    height: 400px;
  }
  position: relative;
  top: 0;
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
`;

const WhiteWrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  background-color: #fff;
`;

const TitleWrapper = styled.div`
  width: 100%;
  min-height: 65px;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  margin-right: 10px;
  width: calc(100% - 20px);
`;

const Heart = styled.img`
  width: 20px;
  height: auto;
  -webkit-user-drag: none;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  width: calc(100% - 40px);
  height: 140px;
  margin: 0 auto;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImgRect = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  margin-right: 15px;
  overflow: hidden;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
`;
