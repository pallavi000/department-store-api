import React, { useState } from "react";
import { TAddress } from "../@types/Address";
import { getAddressApi } from "../service/addressService";
import AddressPicker from "./AddressPicker";
import AddressForm from "./AddressForm";
import { AppState, useAppDispatch } from "../redux/store";
import { fetchAddress } from "../redux/reducers/addressReducer";
import { useSelector } from "react-redux";

type AddressProps = {
  setShipping: React.Dispatch<React.SetStateAction<string>>;
  setBilling: React.Dispatch<React.SetStateAction<string>>;
};

function CheckoutAddress({ setShipping, setBilling }: AddressProps) {
  const { addresses } = useSelector((state: AppState) => ({
    addresses: state.address.addresses,
  }));
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  return (
    <>
      {addresses?.length ? (
        <AddressPicker
          addresses={addresses}
          setBilling={setBilling}
          setShipping={setShipping}
        />
      ) : (
        <AddressForm />
      )}
    </>
  );
}

export default CheckoutAddress;
