import Image from "next/image";
import HomePageTypewriter from "@/components/HomePageTypewriter";
import HomePageSearch from "@/app/(map)/HomePageSearch";

export default function Home() {
  return (
    <main className="flex h-full bg-white w-full">
      <div className="w-full">
        <HomePageTypewriter />
      </div>
    </main>
  );
}
