import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import { handleAddItemCart } from "../app/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  useEffect(() => {
    fetchCartItem();
  }, []);

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const totalPrice = cartItem.reduce((prev, curr) => {
      return prev + curr.productId.price * curr.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartItem]);
  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        totalPrice,
        totalQty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
