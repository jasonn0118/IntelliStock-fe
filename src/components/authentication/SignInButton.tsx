import React from "react";
import Link from "next/link";
import styles from "./authButtons.module.css";

const SignInButton = () => {
  return (
    <Link href="/user">
      <button className={styles.signInButton}>Sign In</button>
    </Link>
  );
};

export default SignInButton;
