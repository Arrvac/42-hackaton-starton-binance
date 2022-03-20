import { FC } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useBooks } from "../hooks/useBooks";

type Book = {
  id: string;
  name: string;
  author: string;
  media_url: string;
  description: string;
};

export const AllBooks: FC = () => {
  const history = useHistory();

  const { books } = useBooks();

  const Books = books.map(book => {
    return (
      <>
        <CoverBook
          src={book.media_url}
          onClick={() => {
            console.log("click");
            history.push(`/book/${book.id}`);
          }}
        ></CoverBook>
      </>
    );
  });

  return (
    <>
      <Navbar />

      <div style={{ paddingLeft: "56px" }}>
        <Title>Last released</Title>
        <Container>{Books.slice(0, 10)}</Container>

        <Title>Most popular</Title>
        <Container>{Books}</Container>
      </div>
    </>
  );
};

const CoverBook = styled.img`
  width: 152px;
  height: 229px;
  padding-right: 20px;
  padding-top: 10px;
  object-fit: cover;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: -0.05em;
`;
