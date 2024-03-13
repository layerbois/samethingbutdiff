import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import axios from "axios";
function FileUpload({
  contract,
  provider,
  account,
}: {
  contract: any;
  provider: any;
  account: any;
}) {
  // const [urlArr, setUrlArr] = useState([]);
  const [file, setFile] = useState<File | never | null>();
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `cde605fb9eace0e611a5`,
              pinata_secret_api_key: `4ee098035685e12f2602a486107d38b0b8463ba00f64d747e342c3c6d71331f1`,
              "Content-Type": "multipart/form-data",
            },
          });
          // console.log(file.type());
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash);
          const fileType = file.type;
          const fileName = file.name;
          console.log(fileType);

          const signer = contract.connect(provider.getSigner());
          console.log(signer.add(account, ImgHash, fileType, fileName));

          //setUrlArr((prev) => [...prev, ImgHash]);

          //Take a look at your Pinata Pinned section, you will see a new file added to you list.
        } catch (error) {
          alert("Error sending File to IPFS");
          console.log(error);
        }
      }

      alert("Successfully Uploaded");
      setFileName("No image selected");
      setFile(null); //to again disable the upload button after upload
    } catch (error) {
      console.log(error); //this mostly occurse when net is not working
    }
  };
  const retrieveFile = (e: any) => {
    const data = e.target?.files[0];
    console.log(data);

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target?.files[0]);
    };
    setFileName(e.target?.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="w-11/12 h-11/12 bg-inherit rounded-xl flex justify-center items-center">
      <form
        className="flex flex-col gap-10 h-full justify-center items-start"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold">Let's Upload Something!</h1>
        <input
        className="w-full text-base bg-violet-800 outline-none h-60 border-dotted border-4 border-white"
          disabled={!account} //disabling button when metamask account is not connected
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="text-xl font-semibold">
          Image: <span className="text-violet-200">{fileName}</span>
        </span>
        {/* choose file */}
        <button className="self-center w-1/3 p-[3px] relative border-none outline-none">
          <div className="bg-black text-xl p-3 rounded-[6px] hover:bg-gradient-to-r from-purple-700 to-gray-800 relative group ease-in-out border-white border-4 duration-200 text-white">
            Upload
          </div>
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
