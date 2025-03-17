import styles from "./AuthButtons.module.css";

interface SignUpButtonProps {
  onClick: () => void;
}

const SignUpButton = ({ onClick }: SignUpButtonProps) => {
  return (
    <button className={styles.signUpButton} onClick={onClick}>
      Sign Up
    </button>
  );
};

export default SignUpButton;
