import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupee } from "../utils/DisplayPriceInRupee";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <section className="bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/* display items */}
          <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
            <p>Your total savings</p>
            <p>{DisplayPriceInRupee(notDiscountTotalPrice - totalPrice)}</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            {cartItem[0] &&
              cartItem.map((item, index) => {
                return (
                  <div>
                    <div className="w-20"></div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="p-2">
          <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
            <div>{DisplayPriceInRupee(totalPrice)}</div>
            <button className="flex items-center gap-1">
              Proceed
              <span>
                <FaCaretRight />{" "}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayCartItem;
