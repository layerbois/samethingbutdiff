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
        className="flex flex-col gap-10 h-full py-4 px-6 border border-white rounded-md bg-violet-950 justify-center items-center bg-dot-white/[0.2]"
        onSubmit={handleSubmit}
      >
        <h1 className=" text-3xl font-normal font-sans backdrop-blur-sm w-full text-center ">Upload your files</h1>
        <input
          className="w-full text-lg font-normal font-sans  bg-gradient-to-br from-gray-700  to-black outline-none h-60 border rounded-md border-white"
          disabled={!account} //disabling button when metamask account is not connected
          type="file"
          id="file-upload"
          name="data"
          accept="image/*"
          multiple={false}
          
          onChange={retrieveFile}
        />
        <span className="text-xl font-semibold">
          {fileName && <span className="text-violet-300 backdrop-blur-sm">Image: {fileName}</span>}
        </span>
        
        
        <button
          className="text-xl py-1 font-sans font-normal backdrop-blur-sm w-full border border-transparent hover:border-white rounded-md active:border-2 transition-all duration-200 ease-in"
          type="submit"
          disabled={!file}
        >
          Upload
        </button>

      </form>
    </div>
  );
}

export default FileUpload;
