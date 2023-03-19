import express from "express";
import userControllers from "../controllers/users.js";
const routes = express.Router();
routes.get('/allUsers',userControllers.getAllUsers);
routes.get('/allUsers/:id',userControllers.getUsersById);
routes.post('/allUsers',userControllers.adduser);
routes.delete('/allUsers/:id', userControllers.deleteuser)
export default routes;