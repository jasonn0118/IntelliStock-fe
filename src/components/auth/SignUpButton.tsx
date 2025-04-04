import { Button } from "@mui/material";

interface SignUpButtonProps {
  onClick: () => void;
}

const SignUpButton = ({ onClick }: SignUpButtonProps) => {
  return (
    <Button color="info" size="small" variant="outlined" onClick={onClick}>
      Sign Up
    </Button>
  );
};

export default SignUpButton;
