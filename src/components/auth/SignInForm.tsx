import { yupResolver } from "@hookform/resolvers/yup";
import { GitHub, Google } from "@mui/icons-material";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {
  handleOAuthLogin,
  signInUserWithEmailAndPassword,
} from "@/lib/api/auth";

import styles from "./AuthForm.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    // TODO: Uncomment the following lines to add password validation
    // .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(
    //   /[@$!%*?&]/,
    //   "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    // )
    .required("Password is required"),
});

const SignInForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { email, password } = data;
      await signInUserWithEmailAndPassword(email, password);
      onSuccess();
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        className={styles.button}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
      <Divider>OR</Divider>
      <p>you can also sign in with</p>
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

export default SignInForm;
