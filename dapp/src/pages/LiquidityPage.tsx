import { OutletContext } from "@/components/Layout";
import { Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function LiquidityPage() {
  const { signer } = useOutletContext<OutletContext>();

  useEffect(() => console.log(signer?.address), [signer]);

  return <Box></Box>;
}

export default LiquidityPage;
