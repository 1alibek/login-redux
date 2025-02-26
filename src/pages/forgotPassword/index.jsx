import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, verifyEmail } from "../../redux/authSlice";
import { TextField, Button, Typography, Paper, Container } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, emailVerified } = useSelector((state) => state.auth);

  const handleEmailSubmit = () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    dispatch(verifyEmail(email)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Email verified! Now reset your password.");
      } else {
        toast.error(result.payload);
      }
    });
  };

  const handlePasswordSubmit = () => {


dispatch(forgotPassword({ email, newPassword }))
  .unwrap()
  .then(() => {
    toast.success("Password updated successfully!");
    console.log("Navigating to login...");
    navigate("/login");
  })
  .catch((error) => {
    toast.error(error);
    console.error("Reset Password Error:", error);
  });
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" align="center">
          Reset Password
        </Typography>

        {!emailVerified ? (
          <>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <Button
              onClick={handleEmailSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Verify Email
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="New Password"
              fullWidth
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Confirm New Password"
              fullWidth
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              margin="normal"
            />
            <Button
              onClick={handlePasswordSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
