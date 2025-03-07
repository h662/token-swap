import { AiOutlineSwap } from "react-icons/ai";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { FormEvent, useEffect, useState } from "react";
import { ethers, JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import useInputPrice from "@/hooks/useInputPrice";

interface SwapTokenProps {
  signer: JsonRpcSigner | null;
  liquidityPoolContract: Contract | null;
}

function SwapToken({ signer, liquidityPoolContract }: SwapTokenProps) {
  const [isReverse, setIsReverse] = useState(true);
  const [tokenA, setTokenA] = useState("0");
  const [tokenB, setTokenB] = useState("0");

  const { getInputPrice: getInputPriceA } = useInputPrice(
    signer,
    liquidityPoolContract,
    tokenA,
    setTokenB,
    isReverse
  );
  const { getInputPrice: getInputPriceB } = useInputPrice(
    signer,
    liquidityPoolContract,
    tokenB,
    setTokenA,
    isReverse
  );

  const tokenSwap = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !signer ||
      !liquidityPoolContract ||
      isNaN(Number(tokenA)) ||
      Number(tokenA) === 0 ||
      isNaN(Number(tokenB)) ||
      Number(tokenB) === 0
    ) {
      return;
    }

    try {
      if (isReverse) {
        const tx = await liquidityPoolContract.swapAForB(
          ethers.parseUnits(tokenA, 18),
          ethers.parseUnits(tokenB, 18)
        );

        const res = await tx.wait();

        console.log(res);
      } else {
        const tx = await liquidityPoolContract.swapBForA(
          ethers.parseUnits(tokenB, 18),
          ethers.parseUnits(tokenA, 18)
        );

        const res = await tx.wait();

        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isNaN(Number(tokenA)) || Number(tokenA) === 0 || !isReverse) return;

    getInputPriceA();
  }, [tokenA]);

  useEffect(() => {
    if (isNaN(Number(tokenB)) || Number(tokenB) === 0 || isReverse) return;

    getInputPriceB();
  }, [tokenB]);

  return (
    <form onSubmit={tokenSwap}>
      <Flex
        direction={isReverse ? "row" : "row-reverse"}
        gap={4}
        alignItems="center"
        maxW={512}
        mx="auto"
      >
        <Field label="Token A">
          <Input
            colorPalette="green"
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
            disabled={!isReverse}
          />
        </Field>
        <Flex direction="column" gap={2}>
          <Button
            variant="ghost"
            colorPalette="green"
            size="2xs"
            onClick={() => setIsReverse(!isReverse)}
          >
            <AiOutlineSwap />
          </Button>
          <Button
            type="submit"
            loadingText="로딩중"
            colorPalette="green"
            size="2xs"
          >
            토큰 스왑
          </Button>
        </Flex>
        <Field label="Token B">
          <Input
            colorPalette="green"
            value={tokenB}
            onChange={(e) => setTokenB(e.target.value)}
            disabled={isReverse}
          />
        </Field>
      </Flex>
    </form>
  );
}

export default SwapToken;
