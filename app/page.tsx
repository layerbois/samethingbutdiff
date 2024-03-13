'use client';

import Upload from "@/artifacts/contracts/Upload.sol/Upload.json";
import Image from "next/image";
import Spline from '@splinetool/react-spline';
import { Tabs } from "@/components/ui/tabs";
import FileUpload from "@/components/FileUpload";
import { useEffect, useState } from "react";
import { ethers } from "ethers";


const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};

export default function Home() {

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

  const tabs = [
    {
      title: "Home",
      value: "Home",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700  to-black">
          <div className="flex flex-row w-full justify-between h-auto z-[100]">
            <Image
              src="/avalanche.svg"
              alt="avalanche"
              width="1000"
              height="1000"
              className="object-cover w-12 h-12"
            />
            <Image
              src="/shardeum.svg"
              alt="shardeum"
              width="1000"
              height="1000"
              className="object-cover w-auto h-10"
            />
          </div>
          <Spline scene="https://prod.spline.design/07UHRUIIKhLzmPlc/scene.splinecode" />
        </div>
      ),
    },
    {
      title: "Upload",
      value: "Upload",
      content: (
        <div className="w-full flex justify-center items-center overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700  to-black">
          <FileUpload contract={contract} provider={provider} account={account}  />
        </div>
      ),
    },
  ];
  
  return (
    <main className="flex min-h-screen w-screen flex-col items-center overflow-hidden">
      <section className="h-[20rem] md:h-[40rem] [perspective:1000px]  w-screen z-20 relative flex flex-col max-w-5xl mx-auto items-start justify-start my-6">
        <Tabs tabs={tabs}  />
      </section>
        <Image
          src="/sphere1.svg"
          alt="shardeum"
          width="1000"
          height="1000"
          className="object-cover w-auto h-24 absolute bottom-10 right-[100%] blur-[4px] z-10 inset-x-0  rounded-xl"
        />
        <Image
          src="/Cube.svg"
          alt="shardeum"
          width="1000"
          height="1000"
          className="object-cover w-auto h-24 absolute top-36 right-[90vw] blur-[4px] z-10 inset-x-0  rounded-xl mx-auto"
        />
        <Image
          src="/sphere.svg"
          alt="shardeum"
          width="1000"
          height="1000"
          className="object-cover w-auto h-[600px] rotate-6 absolute left-[70vw] blur-[4px] z-10 top-10  inset-x-0  rounded-xl mx-auto"
        />
    </main>
  );
}
