import { Request, Response, Router } from "express";
import { loginUser, registerUser } from "../controller/authController"
//import { sessionMiddleware } from "../middlewares/sessionMiddleware";
import { registerValidator, checkRegister } from "../middlewares/validateMiddleware";




const router = Router();


router.get("/", (req, res) => {
    res.send("merhaba ben home route")
})

router.post("/register", registerUser)
//router.post("/register", registerUser)
router.post("/login",loginUser)

export default router;