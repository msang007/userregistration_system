import express from "express";
import userControllers from "../controllers/users.js";
const routers = express.Router();

routers.post('/register',userControllers.register);
routers.post('/login',userControllers.login);
routers.get('/logout',userControllers.logout);
export default routers;