import { Button } from "@mui/material";

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton = ({ onClick }: SignInButtonProps) => {
  return (
    <Button size="small" variant="outlined" onClick={onClick}>
      Sign In
    </Button>
  );
};

export default SignInButton;
