import { AiOutlineSwap } from "react-icons/ai";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { ChangeEvent, useState } from "react";

function SwapToken() {
  const [isReverse, setIsReverse] = useState(true);
  const [tokenA, setTokenA] = useState("0");
  const [tokenB, setTokenB] = useState("0");

  const inputA = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <form>
      <Flex
        direction={isReverse ? "row" : "row-reverse"}
        gap={4}
        bgColor="blue.100"
        alignItems="center"
      >
        <Field label="Token A">
          <Input colorPalette="green" value={tokenA} onChange={inputA} />
        </Field>
        <Flex direction="column" gap={2}>
          <Button
            variant="ghost"
            colorPalette="green"
            size="2xs"
            onClick={() => setIsReverse(!isReverse)}
          >
            <AiOutlineSwap />
          </Button>
          <Button
            type="submit"
            loadingText="로딩중"
            colorPalette="green"
            size="2xs"
          >
            토큰 스왑
          </Button>
        </Flex>
        <Field label="Token B">
          <Input colorPalette="green" />
        </Field>
      </Flex>
    </form>
  );
}

export default SwapToken;
