import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-12 max-w-[16rem]">
      <Image
        src={logo}
        fill
        className="object-contain dark:hidden"
        alt="NextAdmin logo"
        quality={100}
      />

      <Image
        src={darkLogo}
        fill
        className="hidden object-contain dark:block"
        alt="NextAdmin logo"
        quality={100}
      />
    </div>
  );
}
