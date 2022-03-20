import { ChangeEvent, FC, MutableRefObject, useRef, useState } from "react";
import styled from "styled-components";

import { ReactComponent as UploadIcon } from "../assets/svg-icons/download-square.svg";
import { Button, createTheme, TextField } from "@mui/material";
import { colors } from "../theme/colors";
import { getS3Url, uploadFile } from "../services/image";
import { api } from "../services/api";
import { useHistory, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const books_new= [
	{
		name: "NAME",
		author: "AUTHOR",
		id:"4"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"5"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"6"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"4"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"5"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"6"
	},
];

const books_trend= [
	{
		name: "NAME",
		author: "AUTHOR",
		id:"4"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"5"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"6"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"4"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"5"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"6"
	},
];

const books_potential = [
	{
		name: "NAME",
		author: "AUTHOR",
		id:"7"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"8"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"9"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"4"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"5"
	},
	{
		name: "NAME",
		author: "AUTHOR",
		id:"6"
	},
]

export const AllBooks: FC = () => {
	const history = useHistory();
	const lastReleasedBooks = books_new.map((book) => {
		return (
		<>
			<CoverBook src={"/images/test.jpeg"} onClick={() => {
				console.log("click");
				history.push(`/book/${book.id}`);
			}}></CoverBook>
		</>
		)
	});

	const trendBooks = books_trend.map((book) => {
		return (
			<>
				<CoverBook src={"/images/test.jpeg"} onClick={() => {
					console.log("click");
					history.push(`/book/${book.id}`);
				}}></CoverBook>
			</>
			)
	});

	const potentialBooks = books_potential.map((book) => {
		return (
			<>
				<CoverBook src={"/images/test.jpeg"} onClick={() => {
					console.log("click");
					history.push(`/book/${book.id}`);
				}}></CoverBook>
			</>
		)
	});

	//console.log(booksToDisplay)
	return (
		<>
		<Navbar />
			<Title>Last released</Title>
			<Container>
				{lastReleasedBooks}
			</Container>
			<Title>Trends</Title>
			<Container>
				{trendBooks}
			</Container>
			<Title>Potential</Title>
			<Container>
				{potentialBooks}
			</Container>
		</>
	);
};

const CoverBook = styled.img`
	width: 152px;
	height: 229px;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 10px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Title = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: -0.05em;
  padding-left: 20px;
`;