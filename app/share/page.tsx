'use client';

import Upload from "@/artifacts/contracts/Upload.sol/Upload.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FileShare from "@/components/FileShare"

const SharePage = () => {

    const [contract, setContract] = useState<any>();
  const [provider, setProvider] = useState<any>();
  const [account, setAccount] = useState<any>();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

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
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

    return(
        <main className="flex min-h-screen flex-row items-center ">
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-12">
        <FileShare contract={contract} />
      </div>
    </main>
    )
}

export default SharePage