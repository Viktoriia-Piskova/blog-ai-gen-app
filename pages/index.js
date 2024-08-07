import Image from "next/image";
import HeroImage from "../public/hero.webp";
import { Logo } from "../components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center piskova items-center relative">
      <Image src={HeroImage} className="absolute" alt="Hero" fill />
      <div className="relative z-10 text-white px-10 py-5 max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
        <Logo />
        <p className="text-center">
          Get the "made by the free AI API" quality posts with SEO!
          Add tokens using a dummy payment. Click the button below to have fun today!
        </p>
        <Link href="/post/new" className="btn mt-5">
          Begin
        </Link>
        <p className="text-xs mt-10 text-center">Next.JS, Tailwind, Stripe, MongoDB, NextAuth</p>
      </div>
    </div>
  );
}
