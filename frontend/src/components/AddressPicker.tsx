import React, { useState } from "react";
import { getAddressApi } from "../service/addressService";
import { TAddress } from "../@types/Address";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type AddressProps = {
  setShipping: React.Dispatch<React.SetStateAction<string>>;
  setBilling: React.Dispatch<React.SetStateAction<string>>;
  addresses: TAddress[];
};

function AddressPicker({ addresses, setShipping, setBilling }: AddressProps) {
  const handleShippingChange = (event: SelectChangeEvent) => {
    setShipping(event.target.value as string);
  };

  const handleBillingChange = (event: SelectChangeEvent) => {
    setBilling(event.target.value as string);
  };

  return (
    <>
      <FormControl fullWidth sx={{ mb: 6 }}>
        <InputLabel id="demo-simple-select-label">Shipping Address</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleShippingChange}
        >
          {addresses?.map((address: TAddress) => {
            return (
              <MenuItem value={address._id} key={address._id}>
                {address.country} {address.city}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Billing Address</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleBillingChange}
        >
          {addresses?.map((address: TAddress) => {
            return (
              <MenuItem value={address._id} key={address._id}>
                {address.country} {address.city}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default AddressPicker;
