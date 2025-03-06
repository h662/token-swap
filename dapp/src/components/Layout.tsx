import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@chakra-ui/react";
import { ethers, JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import TokenMakerABI from "@/abis/TokenMakerABI.json";
import LiquidityPoolABI from "@/abis/LiquidityPoolABI.json";

export interface OutletContext {
  signer: JsonRpcSigner | null;
}

function Layout() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [tokenAContract, setTokenAContract] = useState<Contract | null>(null);
  const [tokenBContract, setTokenBContract] = useState<Contract | null>(null);
  const [liquidityPoolContract, setLiquidityPoolContract] =
    useState<Contract | null>(null);

  useEffect(() => {
    if (!signer) return;

    setTokenAContract(
      new ethers.Contract(
        import.meta.env.VITE_TOKEN_A_ADDRESS,
        TokenMakerABI,
        signer
      )
    );

    setTokenBContract(
      new ethers.Contract(
        import.meta.env.VITE_TOKEN_B_ADDRESS,
        TokenMakerABI,
        signer
      )
    );

    setLiquidityPoolContract(
      new ethers.Contract(
        import.meta.env.VITE_LIQUIDITY_POOL_ADDRESS,
        LiquidityPoolABI,
        signer
      )
    );
  }, [signer]);

  useEffect(() => console.log(tokenAContract), [tokenAContract]);
  useEffect(() => console.log(tokenBContract), [tokenBContract]);
  useEffect(() => console.log(liquidityPoolContract), [liquidityPoolContract]);

  return (
    <>
      <Header signer={signer} setSigner={setSigner} />
      <Box as="main" bgColor="red.100" maxW={1024} mx="auto">
        <Outlet context={{ signer }} />
      </Box>
    </>
  );
}

export default Layout;
