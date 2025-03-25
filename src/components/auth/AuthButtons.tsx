"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import authStore from "@/app/_lib/store/authStore";

import styles from "./AuthButtons.module.css";
import AuthModal from "./AuthModal/AuthModal";
import SignInButton from "./SignInButton";
import SignInForm from "./SignInForm";
import SignUpButton from "./SignUpButton";
import SignUpForm from "./SignUpForm";

type AuthType = "sign-in" | "sign-up";

const AuthButtons = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthType>("sign-in");

  useEffect(() => {
    authStore.hydrateUser();
  }, []);

  const handleAuthClick = (type: AuthType) => {
    setAuthType(type);
    setModalOpen(true);
  };

  return (
    <div className={styles.authButtonsWrapper}>
      {authStore.hydrated ? (
        <div>
          <p>Welcome back, {authStore.firstName || authStore.email}</p>
          <button
            onClick={() => {
              authStore.signOut();
              setModalOpen(false);
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <SignInButton onClick={() => handleAuthClick("sign-in")} />
          <SignUpButton onClick={() => handleAuthClick("sign-up")} />
          <AuthModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title={authType === "sign-in" ? "Sign In" : "Sign Up"}
          >
            {authType === "sign-in" ? (
              <SignInForm onSuccess={() => setModalOpen(false)} />
            ) : (
              <SignUpForm onSuccess={() => setModalOpen(false)} />
            )}
          </AuthModal>
        </>
      )}
    </div>
  );
});

export default AuthButtons;
