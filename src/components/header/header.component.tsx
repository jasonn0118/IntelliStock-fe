"use client";

import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Logo from "../../../public/logo/Logo.png";
import AuthButtons from "../auth/AuthButtons";
import Styles from "./header.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={Styles.header}>
      <Link href="/">
        <Image src={Logo} alt="Logo" width={100} height={65} />
      </Link>
      
      {/* Desktop Navigation */}
      <nav className={Styles.desktopNav}>
        <Link href="/analysis">Analysis</Link>
        <Link href="/news">News</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <AuthButtons />
      </nav>
      
      {/* Mobile Hamburger Button */}
      <div className={Styles.mobileMenuButton}>
        <IconButton
          aria-label="menu"
          onClick={toggleMobileMenu}
          sx={{ color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${Styles.mobileMenu} ${mobileMenuOpen ? Styles.open : ''}`}>
        <nav className={Styles.mobileNav}>
          <Link href="/analysis" onClick={toggleMobileMenu}>Analysis</Link>
          <Link href="/news" onClick={toggleMobileMenu}>News</Link>
          <Link href="/about" onClick={toggleMobileMenu}>About</Link>
          <Link href="/contact" onClick={toggleMobileMenu}>Contact</Link>
          <div className={Styles.mobileAuthButtons}>
            <AuthButtons />
          </div>
        </nav>
      </div>
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className={Styles.overlay} onClick={toggleMobileMenu} />
      )}
    </header>
  );
}
