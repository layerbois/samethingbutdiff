import { useEffect } from "react";

const FileShare = ({ contract }: { contract: any }) => {
  const sharing = async () => {
    const address = (document.querySelector("#address") as HTMLInputElement)
      ?.value;
    await contract.allow(address);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber") as HTMLSelectElement;
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>        
      <div className="w-2/3 h-2/3 flex justify-center items-center">
        <div className="flex justify-center gap-5 items-center flex-col w-full border border-white bg-violet-950 bg-dot-white/[0.2] h-full p-3 rounded-md">
          <div className="text-3xl w-full font-sans font-normal flex justify-center backdrop-blur-sm items-start">
            Share with
          </div>
          <input
            type="text"
            id="address"
            className="text-lg w-1/2 font-normal font-sans backdrop-blur-sm bg-gradient-to-br from-slate-700 to-black border border-violet-500 rounded-md p-1"
            placeholder="Enter Address"
          />
          <select
            id="selectNumber"
            className="text-lg w-1/2 font-normal font-sans backdrop-blur-sm bg-gradient-to-br from-slate-700 to-black border border-violet-500 rounded-md p-1"
          >
            <option className="address">People With Access</option>
          </select>
          <button id="cancelBtn" className="text-xl py-1 font-sans font-normal backdrop-blur-sm w-1/2 border border-transparent hover:border-white hover:bg-red-600 hover:bg-opacity-45 rounded-md active:border-2 transition-all duration-200 ease-in">Cancel</button>
          <button onClick={() => sharing()} className="text-xl py-1 font-sans font-normal backdrop-blur-sm w-1/2 border border-transparent hover:border-white rounded-md active:border-2 transition-all duration-200 ease-in">Share</button>
        </div>
      </div>
    </>
  );
};

export default FileShare;
