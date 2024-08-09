import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex justify-center items-center h-[450px] mb-20 z-10">
            <Image src="/boardstock.jpg" width={1200} height={1200} alt="logo" className="w-full h-full object-cover" />
            <div className="absolute bg-black opacity-50 w-full h-[420px]"></div>
            <div className="absolute text-center w-full">
                <h1 className="z-10 text-white text-4xl font-bold">Ideas</h1>
                <p className="z-10 text-white text-lg mt-5">Where all our great things begin</p>
            </div>
            
            <div className="z-10 bg-white absolute top-[320px] w-full h-36 clipped-image"></div>
        </div>
    )
}