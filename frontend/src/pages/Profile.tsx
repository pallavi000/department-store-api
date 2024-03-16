import React from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  Avatar,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import EditUserModal from "../components/Modal/EditUserModal";

function Profile() {
  const { user, carts } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  if (!user) return <>Loading...</>;

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: 8, justifyContent: "center", display: "flex" }}
    >
      <Card sx={{ padding: 4, width: "50%" }}>
        <Stack
          gap={4}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Avatar alt={user.name} />
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="h6">{user.email}</Typography>
          <Stack direction={"row"} gap={4}>
            <Button variant="outlined" onClick={handleOpen}>
              Edit
            </Button>
            {carts.length ? (
              <Button variant="outlined">View Cart</Button>
            ) : null}
            <Button variant="outlined">OrderList</Button>
          </Stack>
        </Stack>
      </Card>
      {open && <EditUserModal />}
    </Container>
  );
}

export default Profile;
