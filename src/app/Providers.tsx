"use client";
import { KitProvider } from '@0xsequence/kit'
import { getDefaultWaasConnectors } from '@0xsequence/kit-connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { mainnet, polygon, Chain, polygonAmoy, arbitrumSepolia } from 'wagmi/chains'

const queryClient = new QueryClient();

const Providers = (props: { children: ReactNode }) => {
  const { children } = props;
  const chains = [mainnet, polygon, polygonAmoy, arbitrumSepolia] as [Chain, ...Chain[]];
  const [isClient, setIsClient] = useState(false);

  // Get your own keys on sequence.build
  const projectAccessKey = process.env.NEXT_PUBLIC_PROJECT_ACCESS_KEY || 'AQAAAAAAAEGvyZiWA9FMslYeG_yayXaHnSI'
  const waasConfigKey = process.env.NEXT_PUBLIC_WAAS_CONFIG_KEY || 'eyJwcm9qZWN0SWQiOjE2ODE1LCJlbWFpbFJlZ2lvbiI6ImNhLWNlbnRyYWwtMSIsImVtYWlsQ2xpZW50SWQiOiI2N2V2NXVvc3ZxMzVmcGI2OXI3NnJoYnVoIiwicnBjU2VydmVyIjoiaHR0cHM6Ly93YWFzLnNlcXVlbmNlLmFwcCJ9'
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '970987756660-35a6tc48hvi8cev9cnknp0iugv9poa23.apps.googleusercontent.com'
  // const appleClientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || 'com.horizon.sequence.waas'
  // const appleRedirectURI = window.location.origin + window.location.pathname //this approach doesn't work with nextjs
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || 'c65a6cb1aa83c4e24500130f23a437d8'

  if (!projectAccessKey) {
    throw new Error('projectAccessKey is not defined');
  }

  if (!waasConfigKey) {
    throw new Error('waasConfigKey is not defined');
  }

  if (!googleClientId) {
    throw new Error('googleClientId is not defined');
  }

  // if (!appleClientId) {
  //   throw new Error('appleClientId is not defined');
  // }

  // if (!appleRedirectURI) {
  //   throw new Error('appleRedirectURI is not defined');
  // }

  if (!walletConnectProjectId) {
    throw new Error('walletConnectProjectId is not defined');
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return (
    <div>
      <p>loading...</p>
    </div>
  );

  const connectors = getDefaultWaasConnectors({
    walletConnectProjectId,
    waasConfigKey,
    googleClientId,
    // Notice: AppleID will only work if deployed on https to support Apple redirects
    // appleClientId,
    // appleRedirectURI,
    /* Arbitrum sepolia chainId */
    defaultChainId: 421614,
    appName: 'Kit Starter',
    projectAccessKey
  })

  const transports: { [key: number]: any } = {}

  chains.forEach(chain => {
    transports[chain.id] = http()
  })

  const config = createConfig({
    transports,
    connectors,
    chains
  })

  const kitConfig = {
    projectAccessKey
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <KitProvider config={kitConfig}>
          {children}
        </KitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;