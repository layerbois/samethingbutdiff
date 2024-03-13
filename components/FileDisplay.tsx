import { useState } from "react";

const Display = ({ contract, account }: {contract: any, account: any}) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    const Otheraddress = (document.querySelector("#address") as HTMLInputElement)?.value;
    try {
      let dataArray = [];
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account)
      }
  
      if (dataArray.length > 0) {
        const images = dataArray.map((item: any, i: any) => {
          const fileType = item.fileType;
          if (fileType === 'application/pdf') {
            return (
              <div key={i}>
                <button onClick={() => window.open(item.url)} className="pdf-btn">
                  </button>
                  <div className="pdf-name">{item.fileName}</div>
              </div>
            );
          } else {
            return (
              <a href={item.url} key={i} target="_blank" rel="noreferrer">
                <img
                  key={i}
                  src={item.url}
                  alt="new"
                  className="image-list"
                ></img>
                 <div className="pdf-name">{item.fileName}</div>
              </a>
            );
          }
        });
        setData(images);
      } else {
        alert("No image to display");
      }
    } catch (e) {
      alert("You don't have access");
    }
  };
  

  return (
    <section className="flex flex-col w-10/12 items-center justify-evenly space-y-4 border-white border rounded-md py-4 bg-violet-950 bg-dot-white/[0.2] ">
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      <h1 className=" text-3xl font-sans font-normal text-start backdrop-blur-sm rounded-md w-1/2">Display your Images</h1>
      <input type="text" placeholder="Enter the Address" id="address" className=" text-lg w-1/2 font-normal font-sans backdrop-blur-sm bg-gradient-to-br from-slate-700 to-black border border-violet-500 rounded-md p-1"></input>
      <button className="text-xl py-1 font-sans font-normal backdrop-blur-sm w-1/2 border border-transparent hover:border-white rounded-md active:border-2 transition-all duration-200 ease-in" onClick={getdata}>
        Get Data
      </button>
      <div className="image-list my-2">{data}</div>
    </section>
  );
};

export default Display;