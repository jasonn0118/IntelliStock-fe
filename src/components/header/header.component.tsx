import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo/Logo.png";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Image src={Logo} alt="Logo" width={100} height={100} />
      </Link>
      <nav>
        <a href="/analysis">Analysis</a>
      </nav>
    </header>
  );
}
