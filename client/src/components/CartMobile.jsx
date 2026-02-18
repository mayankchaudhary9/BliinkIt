import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { BsCart4 } from "react-icons/bs";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();

  return (
    <div className="bg-green-600 p-2 rounded text-neutral-100 test-sm">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-green-500 rounded w-fit">
          <BsCart4 />
        </div>
        <div>
          <p>{totalQty} items</p>
          <p>{totalPrice}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default CartMobileLink;
