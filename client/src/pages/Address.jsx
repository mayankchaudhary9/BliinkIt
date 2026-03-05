import React, { useState } from "react";
import { useSelector } from "react-redux";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(false);

  return (
    <div>
      <div className="bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button
          onClick={() => setSelectAddress(true)}
          className="border border-primary-200 text-primary-200 px-3 py-1 rounded-full hover:bg-primary-200 hover:text-black"
        >
          Add Address
        </button>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
        {addressList.map((address, index) => {
          return (
            <div className="border rounded p-3 flex gap-3 bg-white">
              <div>
                <p>{address.address_line}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>
                  {address.country} - {address.pincode}
                </p>
                <p>{address.mobile}</p>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center cursor-pointer"
        >
          Add address
        </div>
      </div>
    </div>
  );
};

export default Address;
