import AddLiquidity from "@/components/AddLiquidity";
import ApproveToken from "@/components/ApproveToken";
import CurrentLiquidity from "@/components/CurrentLiquidity";
import { OutletContext } from "@/components/Layout";
import RemoveLiquidity from "@/components/RemoveLiquidity";
import useMetamask from "@/hooks/useMetamask";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

function LiquidityPage() {
  const {
    signer,
    setSigner,
    tokenAContract,
    tokenBContract,
    liquidityPoolContract,
    toggleCurrent,
  } = useOutletContext<OutletContext>();

  const { connectWallet } = useMetamask(setSigner);

  if (!signer) {
    return (
      <Box>
        <Text>BCSwap은 지갑 로그인 후 이용할 수 있습니다.</Text>
        <Button colorPalette="green" onClick={connectWallet}>
          로그인
        </Button>
      </Box>
    );
  }

  return (
    <Flex direction="column" spaceY={4} mt={8}>
      <CurrentLiquidity
        signer={signer}
        liquidityPoolContract={liquidityPoolContract}
        toggleCurrent={toggleCurrent}
      />
      <ApproveToken
        tokenName="Token A"
        signer={signer}
        tokenContract={tokenAContract}
      />
      <ApproveToken
        tokenName="Token B"
        signer={signer}
        tokenContract={tokenBContract}
      />
      <AddLiquidity
        signer={signer}
        liquidityPoolContract={liquidityPoolContract}
      />
      <RemoveLiquidity
        signer={signer}
        liquidityPoolContract={liquidityPoolContract}
      />
    </Flex>
  );
}

export default LiquidityPage;
