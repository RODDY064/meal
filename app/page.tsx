import Image from "next/image";
import HeroText from "./ui/hero-text";
import Container from "./ui/container";
import CreateModal from "./ui/recipe-modals/action-modal";
import ActionModal from "./ui/recipe-modals/action-modal";

// home page component

export default function Home() {
  return (
    <div className="flex flex-col items-center  my-12">
      <HeroText/>
      <Container/>
    </div>
  );
}
