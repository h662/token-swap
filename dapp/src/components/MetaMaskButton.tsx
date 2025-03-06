import { MenuItem } from "@/components/ui/menu";
import { JsonRpcSigner } from "ethers";
import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

interface MetaMaskButtonProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

function MetaMaskButton({ signer, setSigner }: MetaMaskButtonProps) {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask가 설치되어 있지 않습니다.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    setSigner(null);
  };

  return signer ? (
    <MenuItem
      _hover={{
        bgColor: "green.200",
      }}
      value={signer.address}
      onClick={disconnectWallet}
    >
      🦊 {signer.address.substring(0, 7)}...
      {signer.address.substring(signer.address.length - 5)}
    </MenuItem>
  ) : (
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
