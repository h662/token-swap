import { Table } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";

interface CurrentLiquidityProps {
  signer: JsonRpcSigner | null;
  liquidityPoolContract: Contract | null;
  toggleCurrent: boolean;
}

function CurrentLiquidity({
  signer,
  liquidityPoolContract,
  toggleCurrent,
}: CurrentLiquidityProps) {
  const [totalLiquidity, setTotalLiquidity] = useState("0");
  const [reserveA, setReserveA] = useState("0");
  const [reserveB, setReserveB] = useState("0");

  const getTotalLiquidity = async () => {
    if (!signer || !liquidityPoolContract) return;

    try {
      const res = await liquidityPoolContract.totalSupply();

      setTotalLiquidity(ethers.formatEther(res));
    } catch (error) {
      console.error(error);
    }
  };

  const getReserveA = async () => {
    if (!signer || !liquidityPoolContract) return;

    try {
      const res = await liquidityPoolContract.reserveA();

      setReserveA(ethers.formatEther(res));
    } catch (error) {
      console.error(error);
    }
  };

  const getReserveB = async () => {
    if (!signer || !liquidityPoolContract) return;

    try {
      const res = await liquidityPoolContract.reserveB();

      setReserveB(ethers.formatEther(res));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalLiquidity();
    getReserveA();
    getReserveB();
  }, [signer, liquidityPoolContract, toggleCurrent]);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>총 공급량</Table.ColumnHeader>
          <Table.ColumnHeader>Token A</Table.ColumnHeader>
          <Table.ColumnHeader>Token B</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{totalLiquidity}</Table.Cell>
          <Table.Cell>{reserveA}</Table.Cell>
          <Table.Cell>{reserveB}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}

export default CurrentLiquidity;
