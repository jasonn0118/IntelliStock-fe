import Link from "next/link";
import React from "react";

import styles from "./AuthButtons.module.css";

const SignUpButton = () => {
  return (
    <Link href="/user">
      <button className={styles.signUpButton}>Sign Up</button>
    </Link>
  );
};

export default SignUpButton;
