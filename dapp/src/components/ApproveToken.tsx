import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";
import { ethers } from "ethers";
import { FormEvent, useState } from "react";

interface ApproveTokenProps {
  tokenName: string;
  signer: JsonRpcSigner | null;
  tokenContract: Contract | null;
}

function ApproveToken({ tokenName, signer, tokenContract }: ApproveTokenProps) {
  const [allowanceAmount, setAllowanceAmount] =
    useState("조회 버튼을 클릭해주세요.");
  const [approveAmount, setApproveAmount] = useState("0");
  const [allowanceLoading, setAllowanceLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  const allowanceToken = async () => {
    if (!signer || !tokenContract) return;

    try {
      setAllowanceLoading(true);

      const res = await tokenContract.allowance(
        signer.address,
        import.meta.env.VITE_LIQUIDITY_POOL_ADDRESS
      );

      setAllowanceAmount(ethers.formatEther(res));
    } catch (error) {
      console.error(error);
    } finally {
      setAllowanceLoading(false);
    }
  };

  const approveToken = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signer || !tokenContract || isNaN(Number(approveAmount))) return;

    try {
      setApproveLoading(true);

      const tx = await tokenContract.approve(
        import.meta.env.VITE_LIQUIDITY_POOL_ADDRESS,
        ethers.parseUnits(approveAmount, 18)
      );

      await tx.wait();

      await allowanceToken();
    } catch (error) {
      console.error(error);
    } finally {
      setApproveLoading(false);
    }
  };

  return (
    <>
      <Flex alignItems="center" gap={4}>
        <Text flexGrow={1} ml={3}>
          {allowanceAmount}
        </Text>
        <Button
          onClick={allowanceToken}
          loading={allowanceLoading}
          loadingText="로딩중"
          colorPalette="green"
        >
          {tokenName} 조회
        </Button>
      </Flex>
      <form onSubmit={approveToken}>
        <Flex gap={4}>
          <Input
            value={approveAmount}
            onChange={(e) => setApproveAmount(e.target.value)}
            disabled={approveLoading}
            colorPalette="green"
          />
          <Button
            type="submit"
            loading={approveLoading}
            loadingText="로딩중"
            colorPalette="green"
          >
            {tokenName} 승인
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default ApproveToken;
