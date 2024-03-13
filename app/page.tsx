'use client';
import Upload from "@/artifacts/contracts/Upload.sol/Upload.json";
import Image from "next/image";
import Spline from '@splinetool/react-spline';
import { Tabs } from "@/components/ui/tabs";


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

const tabs = [
  {
    title: "Home",
    value: "Home",
    content: (
      <div className="w-full overflow-x-hidden overflow-y-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700  to-black">
        <Spline scene="https://prod.spline.design/07UHRUIIKhLzmPlc/scene.splinecode" />
      </div>
    ),
  },
  {
    title: "Upload",
    value: "Upload",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Services tab</p>
        <DummyContent />
      </div>
    ),
  },
];



export default function Home() {

  
  

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-12">
        <Tabs tabs={tabs} />
      </div>
    </main>
  );
}
