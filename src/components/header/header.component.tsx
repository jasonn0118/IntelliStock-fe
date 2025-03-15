import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo/Logo.png";
import Styles from "./header.module.css";
import SignInButton from "../authentication/SignInButton";
import SignUpButton from "../authentication/SignUpButton";

export default function Header() {
  return (
    <header className={Styles.header}>
      <Link href="/">
        <Image src={Logo} alt="Logo" width={100} height={65} />
      </Link>
      <nav className={Styles.nav}>
        <Link href="/analysis">Analysis</Link>
        <Link href="/news">News</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <div className={Styles.auth}>
          <SignInButton />
          <SignUpButton />
        </div>
      </nav>
    </header>
  );
}
