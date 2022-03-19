import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare var window: any;

export const Home = () => {
  const ethereum = window.ethereum;

  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null,
  );

  const setupMetamask = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
    }
  };

  const accountChangedHandler = (newAccountAddress: string) => {
    setAccountAddress(newAccountAddress);
    updateEthers();
  };

  const updateEthers = async () => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    const tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    // const tempNewContract = new ethers.Contract(
    //   newContractAddress,
    //   BanishBearsAbi,
    //   tempSigner,
    // );
    // setNewContract(tempNewContract);
  };

  return (
    <>
      <p onClick={() => setupMetamask()}>CONNECT</p>

      <p>{accountAddress}</p>
    </>
  );
};
