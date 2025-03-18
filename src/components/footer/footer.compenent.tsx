"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./footer.module.css";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Company</h3>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/updates">Updates</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* Resources Section */}
        <div className={styles.section}>
          <h3>Resources</h3>
          <ul>
            <li>
              <Link href="/news">News</Link>
            </li>
            <li>
              <Link href="/analysis">Market Analysis</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className={styles.section}>
          <h3>Support</h3>
          <ul>
            <li>
              <Link href="/help">Help Center</Link>
            </li>
            <li>
              <Link href="/guides">Guides</Link>
            </li>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
            <li>
              <Link href="/security">Security</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyright}>
        <p>
          &copy;{" "}
          {currentYear
            ? currentYear === 2025
              ? "2025"
              : `2025 - ${currentYear}`
            : "2025"}{" "}
          Intelli Stock AI Analysis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
