"use client";

import authStore from "@/app/_lib/store/authStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
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

  return (
    <div className={styles.authButtonsWrapper}>
      {authStore.email ? (
        <div>
          <p>Welcome back, {authStore.email}</p>
          <button onClick={() => authStore.logOut()}>Sign Out</button>
        </div>
      ) : (
        <>
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
            {authType === "sign-in" ? <SignInForm /> : <SignUpForm />}
          </AuthModal>
        </>
      )}
    </div>
  );
});

export default AuthButtons;
