import CurrentLiquidity from "@/components/CurrentLiquidity";
import { OutletContext } from "@/components/Layout";
import SwapToken from "@/components/SwapToken";
import useMetamask from "@/hooks/useMetamask";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

function SwapPage() {
  const { signer, setSigner, liquidityPoolContract } =
    useOutletContext<OutletContext>();

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
      />
      <SwapToken />
    </Flex>
  );
}

export default SwapPage;
