import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import styles from "./AuthModal.module.css";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalBox}>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2 }} className={styles.title}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default AuthModal;
