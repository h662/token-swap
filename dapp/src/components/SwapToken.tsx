import { AiOutlineSwap } from "react-icons/ai";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ethers, JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import useInputPrice from "@/hooks/useInputPrice";

interface SwapTokenProps {
  signer: JsonRpcSigner | null;
  tokenAContract: Contract | null;
  tokenBContract: Contract | null;
  liquidityPoolContract: Contract | null;
  toggleCurrent: boolean;
  setToggleCurrent: Dispatch<SetStateAction<boolean>>;
}

function SwapToken({
  signer,
  tokenAContract,
  tokenBContract,
  liquidityPoolContract,
  toggleCurrent,
  setToggleCurrent,
}: SwapTokenProps) {
  const [isReverse, setIsReverse] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
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

  const checkApproved = async () => {
    if (
      !signer ||
      !tokenAContract ||
      !tokenBContract ||
      !liquidityPoolContract
    ) {
      return;
    }

    try {
      if (isReverse) {
        const allowanceA = await tokenAContract.allowance(
          signer.address,
          import.meta.env.VITE_LIQUIDITY_POOL_ADDRESS
        );

        if (Number(tokenA) > Number(ethers.formatEther(allowanceA))) {
          const tx = await tokenAContract.approve(
            import.meta.env.VITE_LIQUIDITY_POOL_ADDRESS,
            ethers.parseUnits(tokenA, 18)
          );

          await tx.wait();
        }
      } else {
        const allowanceB = await tokenBContract.allowance(
          signer.address,
          import.meta.env.VITE_LIQUIDITY_POOL_ADDRESS
        );

        if (Number(tokenB) > Number(ethers.formatEther(allowanceB))) {
          const tx = await tokenBContract.approve(
            import.meta.env.VITE_LIQUIDITY_POOL_ADDRESS,
            ethers.parseUnits(tokenB, 18)
          );

          await tx.wait();
        }
      }

      setIsApproved(true);
    } catch (error) {
      console.error(error);
    }
  };

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

      setIsApproved(false);
      setToggleCurrent(!toggleCurrent);
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
          {isApproved ? (
            <Button
              type="submit"
              loadingText="로딩중"
              colorPalette="green"
              size="2xs"
            >
              토큰 스왑
            </Button>
          ) : (
            <Button
              loadingText="로딩중"
              colorPalette="green"
              size="2xs"
              onClick={checkApproved}
            >
              토큰 스왑 승인
            </Button>
          )}
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
