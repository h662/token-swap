import { Button, Flex, Input } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { JsonRpcSigner } from "ethers";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface AddLiquidityProps {
  signer: JsonRpcSigner | null;
  liquidityPoolContract: Contract | null;
  toggleCurrent: boolean;
  setToggleCurrent: Dispatch<SetStateAction<boolean>>;
}

function AddLiquidity({
  signer,
  liquidityPoolContract,
  toggleCurrent,
  setToggleCurrent,
}: AddLiquidityProps) {
  const [tokenAAmount, setTokenAAmount] = useState("0");
  const [tokenBAmount, setTokenBAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const addLiquidity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !signer ||
      !liquidityPoolContract ||
      isNaN(Number(tokenAAmount)) ||
      isNaN(Number(tokenBAmount))
    ) {
      return;
    }

    try {
      setIsLoading(true);

      const tx = await liquidityPoolContract.addLiquidity(
        ethers.parseUnits(tokenAAmount, 18),
        ethers.parseUnits(tokenBAmount, 18)
      );

      await tx.wait();

      setToggleCurrent(!toggleCurrent);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={addLiquidity}>
      <Flex gap={4}>
        <Input
          value={tokenAAmount}
          onChange={(e) => setTokenAAmount(e.target.value)}
          disabled={isLoading}
          colorPalette="green"
        />
        <Input
          value={tokenBAmount}
          onChange={(e) => setTokenBAmount(e.target.value)}
          disabled={isLoading}
          colorPalette="green"
        />
        <Button
          type="submit"
          loading={isLoading}
          loadingText="로딩중"
          colorPalette="green"
        >
          LP 토큰 발행 (유동성 추가)
        </Button>
      </Flex>
    </form>
  );
}

export default AddLiquidity;
