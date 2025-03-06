import { MenuItem } from "@/components/ui/menu";
import useMetamask from "@/hooks/useMetamask";
import { JsonRpcSigner } from "ethers";
import { Dispatch, SetStateAction } from "react";

interface MetaMaskButtonProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

function MetaMaskButton({ signer, setSigner }: MetaMaskButtonProps) {
  const { connectWallet } = useMetamask(setSigner);

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
