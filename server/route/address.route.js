import { Router } from "express";
import auth from "../middleware/auth";
import { addAddressController } from "../controllers/address.controller";

const addressRouter = Router();

addressRouter.post("/create", auth, addAddressController);

export default addressRouter;
