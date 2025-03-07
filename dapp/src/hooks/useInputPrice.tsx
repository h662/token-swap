import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";
import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

const useInputPrice = (
  signer: JsonRpcSigner | null,
  liquidityPoolContract: Contract | null,
  inputToken: string,
  setOutToken: Dispatch<SetStateAction<string>>,
  isReverse: boolean
) => {
  const getInputPrice = async () => {
    if (!signer || !liquidityPoolContract) return;

    try {
      const reserveA = await liquidityPoolContract.reserveA();
      const reserveB = await liquidityPoolContract.reserveB();

      const res = await liquidityPoolContract.getInputPrice(
        ethers.parseUnits(inputToken, 18),
        isReverse ? reserveA : reserveB,
        isReverse ? reserveB : reserveA
      );

      setOutToken(ethers.formatEther(res));
    } catch (error) {
      console.error(error);
    }
  };

  return { getInputPrice };
};

export default useInputPrice;
