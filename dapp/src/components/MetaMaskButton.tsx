import { MenuItem } from "@/components/ui/menu";
import { JsonRpcSigner } from "ethers";
import { useState } from "react";

function MetaMaskButton() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask가 설치되어 있지 않습니다.");
      return;
    }
  };

  return (
    <MenuItem
      _hover={{
        bgColor: "green.200",
      }}
      value="🦊 MetaMask Login"
      onClick={connectWallet}
    >
      🦊 MetaMask Login
    </MenuItem>
  );
}

export default MetaMaskButton;
