import { Box, Button, Flex } from "@chakra-ui/react";
import { MenuContent, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import MenuButton from "./MenuButton";
import MetaMaskButton from "./MetaMaskButton";
import { Dispatch, SetStateAction } from "react";
import { JsonRpcSigner } from "ethers";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

function Header({ signer, setSigner }: HeaderProps) {
  return (
    <Box as="header" bgColor="green.200" py={4}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxW={1024}
        mx="auto"
      >
        <Box fontSize="2xl" fontWeight="semibold" color="gray.700">
          BCSwap
        </Box>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button colorPalette="green" variant="ghost" size="sm">
              Menu
            </Button>
          </MenuTrigger>

          <MenuContent bgColor="green.50">
            <MenuButton value="💰 Swap Token" href="/" />
            <MenuButton value="🏛️ Liquidity Pool" href="/liquidity" />
            <MetaMaskButton signer={signer} setSigner={setSigner} />
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Box>
  );
}

export default Header;
