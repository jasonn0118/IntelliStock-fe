import styles from "./AuthButtons.module.css";

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton = ({ onClick }: SignInButtonProps) => {
  return (
    <button className={styles.signInButton} onClick={onClick}>
      Sign In
    </button>
  );
};

export default SignInButton;
