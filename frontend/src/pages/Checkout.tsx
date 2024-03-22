import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import Review from "../components/Review";
import CheckoutAddress from "../components/CheckoutAddress";
import { TCart } from "../@types/Cart";
import { TOrderInput } from "../@types/Order";
import { createOrderApi } from "../service/orderService";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [billing, setBilling] = React.useState("");
  const [shipping, setShipping] = React.useState("");
  const [isPaymentMethod, setIsPaymentMethod] = React.useState<boolean>(false);
  const { carts, totalPrice, totalQuantity } = useSelector(
    (state: AppState) => ({
      carts: state.carts.carts,
      totalPrice: state.carts.totalPrice,
      totalQuantity: state.carts.totalOrderQuantity,
    })
  );

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <CheckoutAddress setShipping={setShipping} setBilling={setBilling} />
        );
      case 1:
        return <PaymentForm setIsPaymentMethod={setIsPaymentMethod} />;
      case 2:
        return <Review />;
      default:
        <CheckoutAddress setShipping={setShipping} setBilling={setBilling} />;
    }
  }

  const handleNextStep = (step: number): boolean | undefined => {
    if (step === 0) {
      if (shipping && billing) return false;
    } else if (isPaymentMethod) return false;
    return true;
  };

  const addOrder = async () => {
    try {
      if (shipping && billing && carts.length) {
        const data: TOrderInput = {
          shipping: shipping,
          billing: billing,
          total: totalPrice,
          payment_method: "PAYPAL",
          carts: carts.map((cart) => cart._id),
        };
        const response = await createOrderApi(data);
        console.log(response.data);
      }
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    disabled={handleNextStep(activeStep)}
                    onClick={addOrder}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Place Order
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={handleNextStep(activeStep)}
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
