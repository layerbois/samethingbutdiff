"use client";

import Upload from "@/artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "@/components/FileUpload";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const UploadPage = () => {
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

  return (
    <div className="w-full h-full flex justify-center items-center">
      <FileUpload contract={contract} provider={provider} account={account} />
    </div>
  );
};

export default UploadPage;
