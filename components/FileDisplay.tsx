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
    <>
      <h2 className="header">No One Can See Except You!</h2>
      <div className="image-list">{data}</div>

      <input type="text" placeholder="Enter Address" id="address"></input>

      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;