import Image from "next/image";
import HeroText from "./ui/hero-text";
import Container from "./ui/container";

export default function Home() {
  return (
    <main className="flex flex-col items-center  mt-12">
      <HeroText/>
      <Container/>
    </main>
  );
}
