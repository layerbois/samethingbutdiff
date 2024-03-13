'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useContext, useEffect, useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ethers } from "ethers";
import Upload from "@/artifacts/contracts/Upload.sol/Upload.json";
import { MetaMaskContext, MetaMaskProvider } from "@/context/metamaskcontext";

const inter = Inter({ subsets: ["latin"] });

const loadingStates = [
  {
    text: "Verifying your identity",
  },
  {
    text: "Looking for metamask",
  },
  {
    text: "Gassing your transaction",
  },
  
];



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  
    const loadProvider = async () => {
      if (provider) {
        (window as any).ethereum.on("chainChanged", () => {
          window.location.reload();
        });
  
        (window as any).ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
  
        let contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  
        //
    
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
        setLoading(false);
      } else {
        console.log("No provider found"); 
      }
    };
    provider && loadProvider();
  }, []);
  

  return (
    <html lang="en">
      <body className="bg-violet-800">
        {loading && <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />}
        {children}
      </body>
    </html>
  );
}
