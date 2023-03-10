import styled from "styled-components";
import { useState } from "react";
import { Pretendard } from "../Text";
import PartTitle from "./PartTitle";

const BoothMenu = () => {
  const [thisMenus, setThisMenus] = useState([
    { is_soldout: false, menu: "메뉴1", price: 1000 },
    { is_soldout: false, menu: "메뉴2", price: 2000 },
    { is_soldout: false, menu: "메뉴3", price: 3000 },
    { is_soldout: true, menu: "메뉴4", price: 4000 },
  ]);

  return (
    <>
      <MenuWrapper>
        <PartTitle title="메뉴" />
        {thisMenus.map(menu => {
          let money = menu.price;
          let commaMoney = money
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return (
            <>
              {menu.is_soldout ? (
                <>
                  <MenuContainer>
                    <MenuTextWrapper>
                      <div style={{ width: "72%", wordBreak: "keep-all" }}>
                        <Pretendard
                          size="14px"
                          weight="500"
                          color="var(--black)"
                          style={{ marginBottom: "5px", opacity: "0.4" }}
                        >
                          {menu.menu}
                        </Pretendard>
                      </div>
                      <Pretendard
                        size="13px"
                        weight="300"
                        color="var(--orange)"
                      >
                        sold out
                      </Pretendard>
                    </MenuTextWrapper>
                  </MenuContainer>
                </>
              ) : (
                <>
                  <MenuContainer>
                    <MenuTextWrapper>
                      <div style={{ width: "72%", wordBreak: "keep-all" }}>
                        <Pretendard
                          size="14px"
                          weight="500"
                          color="var(--black)"
                          style={{ marginBottom: "5px" }}
                        >
                          {menu.menu}
                        </Pretendard>
                      </div>
                      <Pretendard size="13px" weight="300" color="var(--black)">
                        {commaMoney}원
                      </Pretendard>
                    </MenuTextWrapper>
                  </MenuContainer>
                </>
              )}
            </>
          );
        })}
      </MenuWrapper>
    </>
  );
};

export default BoothMenu;

const MenuWrapper = styled.div`
  position: relative;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 50px);
  margin: 0 auto;
`;

const MenuTextWrapper = styled.div`
  width: 100%;
  min-height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
