"use client";
import { Card, Group } from "boilerplate-design-system";
import { useAccount } from "wagmi";
import TestSendTransaction from "../components/TestSendTransaction";
import TestSignMessage from "../components/TestSignMessage";
import TestVerifyMessage from "../components/TestVerifyMessage";

export function Connected() {
  const { address, chain, chainId } = useAccount();

  if (!address || !chain || !chainId) {
    return (
      <div className="flex flex-col gap-8">
        <Group title="User info">
          <Card
            style={{ gap: "1rem", display: "flex", flexDirection: "column" }}
          >
            Missing information required to display user info
          </Card>
        </Group>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Group>
        <Card
          collapsable
          title="Sign message"
          data-id="sign-message"
          className="bg-white/10 border border-white/10 backdrop-blur-xs"
        >
          <TestSignMessage />
        </Card>

        <Card
          collapsable
          title="Verify message"
          data-id="verify-message"
          className="bg-white/10 border border-white/10 backdrop-blur-xs"
        >
          <TestVerifyMessage chainId={chainId} />
        </Card>

        <Card
          collapsable
          title="Send transaction"
          data-id="send-transaction"
          className="bg-white/10 border border-white/10 backdrop-blur-xs"
        >
          <TestSendTransaction chainId={chainId} />
        </Card>
      </Group>
    </div>
  );
}
