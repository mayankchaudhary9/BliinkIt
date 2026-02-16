import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";

const AddToCartButton = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItem } = useGlobalContext();

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
  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
      >
        {loading ? <Loading /> : "Add"}
      </button>
    </div>
  );
};

export default AddToCartButton;
