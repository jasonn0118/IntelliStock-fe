import { signInUserWithEmailAndPassword } from "@/app/_lib/api/auth";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        className={styles.button}
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
