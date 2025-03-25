import { yupResolver } from "@hookform/resolvers/yup";
import { GitHub, Google } from "@mui/icons-material";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {
  handleOAuthLogin,
  signUpUserWithEmailAndPassword,
} from "@/app/_lib/api/auth";

import styles from "./AuthForm.module.css";

const schema = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

const SignUpForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }) => {
    try {
      const { firstName, lastName, email, password } = data;

      await signUpUserWithEmailAndPassword({
        firstName,
        lastName,
        email,
        password,
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        label="First Name (Optional)"
        variant="outlined"
        fullWidth
        {...register("firstName")}
      />
      <TextField
        label="Last Name (Optional)"
        variant="outlined"
        fullWidth
        {...register("lastName")}
      />
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        type="password"
        variant="outlined"
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        className={styles.button}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
      <Divider>OR</Divider>
      <p>you can also sign up with</p>
      <div className={styles.oauthButtons}>
        <IconButton onClick={() => handleOAuthLogin("google")}>
          <Google />
        </IconButton>
        <IconButton onClick={() => handleOAuthLogin("github")}>
          <GitHub />
        </IconButton>
      </div>
    </form>
  );
};

export default SignUpForm;
