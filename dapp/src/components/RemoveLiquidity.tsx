import { Button, Flex, Input } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { JsonRpcSigner } from "ethers";
import { FormEvent, useState } from "react";

interface RemoveLiquidityProps {
  signer: JsonRpcSigner | null;
  liquidityPoolContract: Contract | null;
}

function RemoveLiquidity({
  signer,
  liquidityPoolContract,
}: RemoveLiquidityProps) {
  const [liquidityAmount, setLiquidityAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const removeLiquidity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signer || !liquidityPoolContract || isNaN(Number(liquidityAmount))) {
      return;
    }

    try {
      setIsLoading(true);

      const tx = await liquidityPoolContract.removeLiquidity(
        ethers.parseUnits(liquidityAmount, 18)
      );

      const res = await tx.wait();

      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={removeLiquidity}>
      <Flex gap={4}>
        <Input
          value={liquidityAmount}
          onChange={(e) => setLiquidityAmount(e.target.value)}
          disabled={isLoading}
          colorPalette="green"
        />
        <Button
          type="submit"
          loading={isLoading}
          loadingText="로딩중"
          colorPalette="green"
        >
          LP 토큰 정산 (유동성 제거)
        </Button>
      </Flex>
    </form>
  );
}

export default RemoveLiquidity;
