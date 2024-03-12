import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { TAddressInput } from "../@types/Address";
import { Button } from "@mui/material";
import { addAddressApi, getAddressApi } from "../service/addressService";

type AddressProps = {
  onAddressSubmit: () => void;
};
export default function AddressForm({ onAddressSubmit }: AddressProps) {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<TAddressInput>();

  const onSubmitHandler: SubmitHandler<TAddressInput> = async (
    data: TAddressInput
  ) => {
    await addAddressApi(data);
    onAddressSubmit();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid
        container
        spacing={3}
        component={"form"}
        onSubmit={onSubmit(onSubmitHandler)}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            label="City"
            fullWidth
            {...register("city")}
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="street"
            {...register("street")}
            label="Street"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip_code"
            label="Zip / Postal code"
            fullWidth
            {...register("zip_code")}
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            label="Country"
            fullWidth
            {...register("country")}
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            {...register("phone")}
            label="Phone"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
        <Button
          variant="contained"
          size="small"
          type="submit"
          sx={{ background: "green", marginLeft: 3, marginTop: 2 }}
        >
          Submit
        </Button>
      </Grid>
    </React.Fragment>
  );
}
