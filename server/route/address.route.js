import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addAddressController,
  getAddressController,
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/create", auth, addAddressController);
addressRouter.post("/get", auth, getAddressController);

export default addressRouter;
