import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TUser, TUserUpdate } from "../../@types/User";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserProfile } from "../../redux/reducers/authReducer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditUserModal({
  open,
  handleClose,
  setOpen,
}: {
  open: boolean;
  handleClose: () => void;
  setOpen: (value: boolean) => void;
}) {
  const user = useSelector((state: AppState) => state.auth.user);

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<TUserUpdate>();

  const dispatch = useAppDispatch();

  const onSubmitHandler: SubmitHandler<TUserUpdate> = async (
    data: TUserUpdate
  ) => {
    if (user) {
      await dispatch(updateUserProfile({ id: user?._id, data }));
      handleClose = () => setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        xs={6}
        sm={8}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            width: "50%",
            padding: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <Box
            onSubmit={onSubmit(onSubmitHandler)}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="name"
              type="text"
              id="name"
              autoComplete="name"
              {...register("name")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email")}
              autoFocus
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Grid>
    </Modal>
  );
}
