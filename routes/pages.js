import express from "express";
import userControllers from "../controllers/users.js";
const router = express.Router();

// definition de mes routes

router.get(["/", "/login"], (req, res) => {
    res.render("login.hbs");
});

router.get("/register",(req,res)=>{
    res.render("register.hbs");
});

router.get("/profile", userControllers.isLoggedIn, (req, res) => {
    if (req.user) {
      res.render("profile.hbs", { user: req.user });
    } else {
      res.redirect("/login");
    }
});

router.get("/home", userControllers.isLoggedIn, (req, res) => {
    //console.log(req.name);
    if (req.user) {
      res.render("home.hbs", { user: req.user });
    } else {
      res.redirect("/login");
    }
});


export default router;