"use client";

import { useState } from "react";
import styles from "./AuthButtons.module.css";
import AuthModal from "./AuthModal/AuthModal";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";

export default function AuthButtons() {
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <div className={styles.authButtonsWrapper}>
      <SignInButton
        onClick={() => {
          setAuthType("sign-in");
          setModalOpen(true);
        }}
      />
      <SignUpButton
        onClick={() => {
          setAuthType("sign-up");
          setModalOpen(true);
        }}
      />
      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={authType === "sign-in" ? "Sign In" : "Sign Up"}
      >
        {authType === "sign-in" ? (
          <div>Sign In Form</div>
        ) : (
          <div>Sign Up Form</div>
        )}
      </AuthModal>
    </div>
  );
}
