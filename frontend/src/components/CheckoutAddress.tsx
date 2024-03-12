import React, { useState } from "react";
import { TAddress } from "../@types/Address";
import { getAddressApi } from "../service/addressService";
import AddressPicker from "./AddressPicker";
import AddressForm from "./AddressForm";

type AddressProps = {
  setShipping: React.Dispatch<React.SetStateAction<string>>;
  setBilling: React.Dispatch<React.SetStateAction<string>>;
};

function CheckoutAddress({ setShipping, setBilling }: AddressProps) {
  const [addresses, setAddresses] = useState<TAddress[]>();

  const getAddresses = async () => {
    try {
      const address = await getAddressApi();
      setAddresses(address);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAddresses();
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
        <AddressForm onAddressSubmit={getAddresses} />
      )}
    </>
  );
}

export default CheckoutAddress;
