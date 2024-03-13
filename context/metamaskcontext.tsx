
import { ethers } from 'ethers';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import Upload from "@/artifacts/contracts/Upload.sol/Upload.json";

interface MetaMaskContextValue {
    account: string;
    setAccount: React.Dispatch<React.SetStateAction<string>>;
    contract: ethers.Contract | null | undefined;
    setContract: React.Dispatch<React.SetStateAction<ethers.Contract | null | undefined>>;
    provider: ethers.providers.Web3Provider | null | undefined;
    setProvider: React.Dispatch<React.SetStateAction<ethers.providers.Web3Provider | null | undefined>>;
}

export const MetaMaskContext = createContext<MetaMaskContextValue>({} as MetaMaskContextValue);

export const MetaMaskProvider = ({ children }: PropsWithChildren) => {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState<ethers.Contract | null>();
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>();
    
  
    

    return (
        <MetaMaskContext.Provider value={{ account, contract, provider, setAccount, setContract, setProvider }}>
            {children}
        </MetaMaskContext.Provider>
    );
  };