import { AiOutlineSwap } from "react-icons/ai";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { JsonRpcSigner } from "ethers";
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

  useEffect(() => {
    if (isNaN(Number(tokenA)) || Number(tokenA) === 0 || !isReverse) return;

    getInputPriceA();
  }, [tokenA]);

  useEffect(() => {
    if (isNaN(Number(tokenB)) || Number(tokenB) === 0 || isReverse) return;

    getInputPriceB();
  }, [tokenB]);

  return (
    <form>
      <Flex
        direction={isReverse ? "row" : "row-reverse"}
        gap={4}
        bgColor="blue.100"
        alignItems="center"
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
