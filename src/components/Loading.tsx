import Image from "next/image";

const Loading = () => {
  return (
    // Spin and the logo

    <div className="flex flex-col items-center justify-center h-screen">
      <Image src={"/logo.png"} alt="logo" width={200} height={200} className="rounded-full pb-10"/>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>

  );
};

export default Loading;
