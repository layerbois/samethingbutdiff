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
      <div className="w-full h-full flex">
        <h2 className="text-3xl bg-violet-950 text-white font-bold">
          Sharing is Caring
        </h2>
        <div className="w-2/3 h-2/3 flex justify-center items-center">
          <div className="flex justify-center gap-5 items-center flex-col w-full bg-violet-700 h-full p-3">
            <div className="text-2xl w-full font-bold flex justify-center items-start">
              Share with
            </div>

            <input
              type="text"
              id="address"
              className="text-black w-fit p-3 focus:outline-none rounded"
              placeholder="Enter Address"
            ></input>

            <form id="myForm">
              <select
                id="selectNumber"
                className="text-black w-full p-3 focus:outline-none rounded"
              >
                <option className="address">People With Access</option>
              </select>
            </form>
            <div className="footer flex gap-5">
              <button id="cancelBtn">Cancel</button>
              <button onClick={() => sharing()}>Share</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileShare;
