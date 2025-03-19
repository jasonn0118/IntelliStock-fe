import { signUpUserWithEmailAndPassword } from "@/app/_lib/api/auth";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./AuthForm.module.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signUpUserWithEmailAndPassword(formData);
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="First Name (Optional)"
        name="firstName"
        variant="outlined"
        fullWidth
        onChange={handleChange}
      />
      <TextField
        label="Last Name (Optional)"
        name="lastName"
        variant="outlined"
        fullWidth
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        required
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        required
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        className={styles.button}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
