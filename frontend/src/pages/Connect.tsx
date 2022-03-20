import { Button } from "@mui/material";
import styled from "styled-components";
import { colors } from "../theme/colors";

declare var window: any;

type ConnectProps = {
  setAddress: (address: string | null) => void;
};

export const Connect = ({ setAddress }: ConnectProps) => {
  const ethereum = window.ethereum;

  const setupMetamask = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      accountChangedHandler(accounts[0]);
    }
  };

  const accountChangedHandler = (newAccountAddress: string) => {
    setAddress(newAccountAddress);
    document.cookie = newAccountAddress;
  };

  return (
    <Container>
      <Button
        variant="outlined"
        style={{
          color: colors.main.black,
          borderColor: colors.main.black,
          textTransform: "none",
        }}
        onClick={() => {
          setupMetamask();
        }}
      >
        Connect your wallet
      </Button>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
