import { Router } from "express";
import userRouter from "./users.mjs";
import authRouter  from "./autheticateUser.mjs";
import paymetRouter from "./payments.mjs";
const routerIndex = Router()
routerIndex.use(userRouter);
routerIndex.use(authRouter);
routerIndex.use(paymetRouter);

export default routerIndex