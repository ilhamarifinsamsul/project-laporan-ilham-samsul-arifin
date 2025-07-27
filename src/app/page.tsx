// import Image from "next/image";
"use client";

import { Header } from "@/components/Header";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Footer } from "@/components/Footer";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-gray-50">
        <Header />
      </div>
      <div className="min-h-screen flex grow flex-col gap-4 md:flex-row py-12">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"></div> */}
          <p className={`text-2xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Website.</strong> <br />
            <strong>Taruna Siaga Bencana!!</strong>
          </p>
          <p className="text-gray-600 text-lg md:text-lg md:leading-normal">
            Taruna Siaga Bencana, adalah relawan sosial atau Tenaga
            Kesejahteraan Sosial berasal dari masyarakat yang memiliki
            kepedulian dan aktif dalam penanggulangan bencana bidang
            perlindungan sosial
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/logo-tagana.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="hidden md:block"
          />
          <Image
            src="/logo-tagana.png"
            alt="Hero Image"
            width={560}
            height={620}
            className="block md:hidden"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
