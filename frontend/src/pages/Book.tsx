import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import { colors } from "../theme/colors";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import axios from "axios";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import contractAbi from "../assets/contract.json";

declare var window: any;

const decimals = BigNumber.from("1000000000000000000");

export const Book = () => {
  const params = useParams<{ id: string }>();

  const [modalStatus, setModalStatus] = useState(false);

  const { book } = useBook(params.id);
  const [titleSection, setTitleSection] = useState<
    "content" | "ranking" | "comments"
  >("content");

  const pay = (amount: number) => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    const tempSigner = tempProvider.getSigner();

    const contract = new ethers.Contract(
      "0x41De25E4b2F30752578F721Bc349eB5c413Bd38a",
      contractAbi,
      tempSigner,
    );

    contract.transfer(book?.address, `${amount}000000000000000000`);
  };

  return (
    <>
      {book ? (
        <>
          <Navbar />
          <Bookinfo>
            <Left>
              <BookCover src={book.media_url} alt="BookCover" />
            </Left>
            <Right>
              <div>
                <TitleBook>{book.name}</TitleBook>
                <NameAuthor>
                  Author: <span style={{ color: "red" }}>{book.author}</span>
                </NameAuthor>
                <BookStatus>
                  <Stat>Sci-f</Stat>
                  <Stat>104 Chapters</Stat>
                  <Stat>719.1K Views</Stat>
                  <Stat>Completed</Stat>
                </BookStatus>
              </div>
              <Buttons>
                <Bt>READ</Bt>
                <Bt>+ ADD TO LIBRARY</Bt>
                <Bt
                  onClick={() => {
                    setModalStatus(true);
                  }}
                >
                  SEND GIFTS
                </Bt>
                <Modal
                  open={modalStatus}
                  onClose={() => setModalStatus(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <BoxContainer>
                    <InputContainer>
                      <Column
                        onClick={() => {
                          pay(5);
                        }}
                      >
                        <Gift src={require("../assets/img_1.jpeg")} />
                        <p>5 coins</p>
                      </Column>
                      <Column
                        onClick={() => {
                          pay(10);
                        }}
                      >
                        <Gift
                          src={
                            "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2020.2F03.2F24.2F633dfe3a-b5ec-450d-873b-34eccbe4612b.2Ejpeg/850x478/quality/90/crop-from/center/gateau-d-anniversaire-multicolore.jpeg"
                          }
                        />
                        <p>10 coins</p>
                      </Column>
                      <Column
                        onClick={() => {
                          pay(20);
                        }}
                      >
                        <Gift src={require("../assets/img_2.jpg")} />
                        <p>20 coins</p>
                      </Column>
                      <Column
                        onClick={() => {
                          pay(50);
                        }}
                      >
                        <Gift
                          src={
                            "https://img.pixers.pics/pho_wat(s3:700/FO/19/33/55/02/5/700_FO193355025_1fbedf868f86179785012aa576901d2b.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/posters-ours-mignon-bebe-au-volant-de-voiture-cartoon-illustration-vectorielle-dessines-a-la-main-peut-etre-utilise-pour-l-39-impression-de-t-shirt-de-bebe-la-conception-d-39-impression-de-mode-les-vetements-d-39-enfants-la-carte-de-salutation-et-d-39-invitation-de-fete-de-naissance-de-bebe.jpg.jpg"
                          }
                        />
                        <p>50 coins</p>
                      </Column>
                    </InputContainer>
                  </BoxContainer>
                </Modal>
              </Buttons>
            </Right>
          </Bookinfo>
          <Menu>
            <SectionTitle
              isActive={titleSection === "content"}
              onClick={() => {
                setTitleSection("content");
              }}
            >
              Table of Content
            </SectionTitle>
            <SectionTitle
              isActive={titleSection === "ranking"}
              onClick={() => {
                setTitleSection("ranking");
              }}
            >
              Fans Ranking
            </SectionTitle>
            <SectionTitle
              isActive={titleSection === "comments"}
              onClick={() => {
                setTitleSection("comments");
              }}
            >
              Comments
            </SectionTitle>
          </Menu>
          <Content></Content>
        </>
      ) : null}
    </>
  );
};

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-family: Work Sans;
  margin-left: 90px;
  margin-right: 200px;
`;

const Content = styled.div`
  height: 600px;
  width: 90%;
  margin: 10px;
  margin-left: 90px;
  box-shadow: 0px 12px 24px rgba(186, 186, 186, 0.5);
  border-radius: 8px;
  justify-centent: center;
`;

type SectionTitleProps = {
  isActive: boolean;
};

const SectionTitle = styled.a<SectionTitleProps>`
  text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
  color: grey;
  font-weight: 900;
  font-size: 28px;
  text-align: left;
  margin-right: 42px;
  cursor: pointer;
`;

const Bookinfo = styled.div`
  width: 100%;
  padding: 80px;
  display: flex;
  flex-direction: row;
  font-family: Work Sans;
`;

const Left = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 50px;
`;

const BookCover = styled.img`
  width: 180px;
  height: 254px;
  object-fit: cover;
`;

const TitleBook = styled.p`
  width: 100%;
  color: black;
  font-weight: 800;
  font-size: 38px;
  line-height: 44px;
  text-align: left;
  margin: 0px;
`;

const NameAuthor = styled.p`
  width: 100%;
  color: balck;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  margin-bottom: 0px;
`;

const BookStatus = styled.div`
  display: flex;
  justify-content: left;
  width: 50%;
`;

const Stat = styled.p`
  color: balck;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  margin-right: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: left;
  width: 50%;
`;

const Bt = styled.div`
  color: balck;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  text-align: left;
  margin-right: 20px;
  background: linear-gradient(270.06deg, #e33c3d 10.22%, #ee7354 77.56%);
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
`;

const BoxContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const InputContainer = styled.div`
  background-color: ${colors.main.white};
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 10px;
  pointer-events: auto;
  display: flex;
  flex-direction: row;
`;

const Gift = styled.img`
  height: 50px;
  width: 120px;
  object-fit: cover;
  cursor: pointer;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 12px 24px rgba(186, 186, 186, 0.5);
  margin-right: 15px;
`;
