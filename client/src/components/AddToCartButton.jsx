import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItem } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [itemSelected, setItemSelected] = useState(false);
  const [qty, setQty] = useState(0);

  const handleAddToCart = async (e) => {
    // for stopping redirect after click on add button
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  //checking this item in cart or not
  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id,
    );
    setItemSelected(checkingItem);

    const product = cartItem.find((item) => item.productId._id === data._id);
    setQty(product?.quantity);
  }, [data, cartItem]);

  const increaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="w-full max-w-[150px]">
      {itemSelected ? (
        <div className="flex">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full"
          >
            <FaMinus />
          </button>
          <p className="flex-1 w-full">{qty}</p>
          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
