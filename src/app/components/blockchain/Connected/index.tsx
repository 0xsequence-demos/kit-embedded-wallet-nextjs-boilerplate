import { Box, Text } from "@0xsequence/design-system";
import { useAccount } from "wagmi";
import TestSendTransaction from "./TestSendTransaction";
import Disconnect from "./Disconnect";
import ChainInfo from "./ChainInfo";
import TestSignMessage from "./TestSignMessage";

const Connected = () => {
  const { address, chain } = useAccount();
  return (
    <>
      <Text variant="large" fontWeight="bold" color="text100">
        Connected with address: {address}
      </Text>
      <Disconnect />
      {chain && <ChainInfo chain={chain} />}
      <Box display="flex" flexDirection="column" gap="4">
        <TestSignMessage />
        <TestSendTransaction />
      </Box>
    </>
  );
};

export default Connected;
