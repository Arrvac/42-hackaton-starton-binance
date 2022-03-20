import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import { colors } from "../theme/colors";
import {useState} from "react";

const book = {
	name: 'Name of Book',
	media_url: `https://d2q4io46p490bd.cloudfront.net/5b4a24aa-6448-49bd-9d9d-0d3f4b65e274`
}

export const Book = () => {

	const [titleSection, setTitleSection] = useState<"content" | "ranking" | "comments">("content")
	return (
		<>
		<Navbar />
		<Bookinfo>
			<Left>
				<BookCover
				src= {book.media_url}
				alt="BookCover"
				/>
			</Left>
			<Right>
				<div>
					<TitleBook>
						Ace Of Terrans
					</TitleBook>
					<NameAuthor>
						Author: <span style={{color: 'red'}}>the_wordsmith</span>
					</NameAuthor>
					<BookStatus>
						 <Stat>Sci-f</Stat>
						 <Stat>104 Chapters</Stat>
						 <Stat>719.1K Views</Stat>
						 <Stat>Completed</Stat>
					</BookStatus>
				</div>
				<Buttons>
					<Bt>
						READ
					</Bt>
					<Bt>
						+ ADD TO LIBRARY
					</Bt>
					<Bt>
						SEND GIFTS
					</Bt>
				</Buttons>
			</Right>
		</Bookinfo>
		<Menu>

			<SectionTitle isActive={titleSection === "content"} onClick={() => {
				setTitleSection("content")
			}}>Table of Content</SectionTitle>
			<SectionTitle isActive={titleSection === "ranking"}  onClick={() => {
				setTitleSection("ranking")
			}}>Fans Ranking</SectionTitle>
			<SectionTitle isActive={titleSection === "comments"} onClick={() => {
				setTitleSection("comments")
			}}>Comments</SectionTitle>

		</Menu>
		<Content>
		</Content>
		</>
	)
}

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
}

const SectionTitle = styled.a<SectionTitleProps>`
text-decoration: ${({isActive}) => isActive ? "underline" : "none"};
  color: grey;
  font-weight: 900;
  font-size: 28px;
  text-align: left;
  margin-right: 42px;
  &:hover: {
	  color: red;}
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
`;

const TitleBook = styled.p`
  width:100%;
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
`;
