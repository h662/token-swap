import { Box, Button, Flex } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const navigatePage = (href: string) => {
    navigate(href);
  };

  return (
    <Box as="header" bgColor="green.500" py={4}>
      <Flex
        bgColor="red.100"
        justifyContent="space-between"
        alignItems="center"
        maxW={1024}
        mx="auto"
      >
        <Box fontSize="2xl" fontWeight="semibold">
          BCSwap
        </Box>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </MenuTrigger>

          <MenuContent>
            <MenuItem value="Swap Token" onClick={() => navigatePage("/")}>
              Swap Token
            </MenuItem>
            <MenuItem
              value="Liquidity Pool"
              onClick={() => navigatePage("/liquidity")}
            >
              Liquidity Pool
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Box>
  );
}

export default Header;
