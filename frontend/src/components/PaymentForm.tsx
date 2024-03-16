import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { TPayment } from "../@types/Payment";

export default function PaymentForm({
  setIsPaymentMethod,
}: {
  setIsPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    watch,
  } = useForm<TPayment>({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: 0,
    },
  });
  const [isFormFilled, setIsFormFilled] = React.useState(false);

  const watchAllFields = watch(); // Get all form values

  const onSubmitHandler: SubmitHandler<TPayment> = async (data: TPayment) => {
    console.log(data);
  };

  React.useEffect(() => {
    const isFilled = Object.values(watchAllFields).every((value) => !!value);
    setIsFormFilled(isFilled);
  }, [watchAllFields]);

  React.useEffect(() => {
    if (isFormFilled) {
      setIsPaymentMethod(isFormFilled);
    }
  }, [isFormFilled]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid
        container
        component={"form"}
        spacing={3}
        onSubmit={onSubmit(onSubmitHandler)}
      >
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            {...register("cardName", { required: true })}
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            {...register("cardNumber", { required: true })}
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            {...register("expDate", { required: true })}
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            {...register("cvv", { required: true })}
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
