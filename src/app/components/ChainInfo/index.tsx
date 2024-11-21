import { Box } from "@0xsequence/design-system";
import { Address, Chain } from "viem";
import ActiveChain from "./ActiveChain";
import ChainSwitcher from "./ChainSwitcher";
import NativeBalance from "./NativeBalance";

const ChainInfo = (props: { chain: Chain; address: Address }) => {
  const { chain, address } = props;

  return (
    <Box marginBottom="8">
      <Box
        display="flex"
        gap="4"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <ActiveChain chain={chain} />
        <ChainSwitcher chain={chain} />
      </Box>
      <NativeBalance chain={chain} address={address} />
    </Box>
  );
};

export default ChainInfo;