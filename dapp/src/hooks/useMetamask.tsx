import { JsonRpcSigner } from "ethers";
import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

const useMetamask = (
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>
) => {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask가 설치되어 있지 않습니다.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  return { connectWallet };
};

export default useMetamask;
