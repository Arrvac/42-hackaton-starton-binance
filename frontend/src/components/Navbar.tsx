import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DiscordIcon } from "../assets/icons/discord.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/twitter.svg";
import { colors } from "../theme/colors";

export const Navbar = () => {
  const history = useHistory();

  return (
    <>
      <HeaderBackground src={"/images/background.png"} />
      <Container>
        <Title>Publish.me</Title>
        <Center>
          <Link onClick={() => history.push(`/all-books`)}>All books</Link>
          <Link
            onClick={() => {
              console.log("click");
              history.push(`/create-book`);
            }}
          >
            Publish my book
          </Link>
        </Center>
        <Right>
          <DiscordIcon
            onClick={() => window.open("", "_blank")}
            style={{
              color: colors.main.black,
              height: "25px",
              width: "25px",
              cursor: "pointer",
            }}
          />
          <TwitterIcon
            onClick={() => window.open("https://twitter.com", "_blank")}
            style={{
              color: colors.main.black,
              height: "25px",
              width: "25px",
              cursor: "pointer",
            }}
          />
          <Button
            variant="outlined"
            style={{
              color: colors.main.black,
              borderColor: colors.main.black,
              borderRadius: "20px",
              marginLeft: "20px",
              textTransform: "none",
            }}
          >
            1000 coins
          </Button>
        </Right>
      </Container>
    </>
  );
};

const Error = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background: linear-gradient(270.06deg, #e33c3d 10.22%, #ee7354 77.56%);
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.div`
  color: ${colors.main.white};
  font-family: Work Sans;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.01em;
`;

const HeaderBackground = styled.img`
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 56px;
  padding-right: 56px;
  padding-top: 10px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 20px;
  }

  & > *:not(:last-child):hover {
    transition: transform 100ms linear;
    transform: scale(1.15);
  }
`;
const Title = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: -0.05em;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
`;
const Link = styled.p`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 1vw;
  text-align: center;
  letter-spacing: 0.29em;
  margin-right: 50px;
  cursor: pointer;
`;
