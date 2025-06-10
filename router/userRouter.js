const router = require("express").Router();
const userRouter = require("../controller/userController");
const { verifyTokenAndUser, verifyToken } = require("../middleware/auth")

router.post("/userSignup", userRouter.userSignup);
router.post("/userLogin", userRouter.userLogin);
router.get("/getUser", verifyTokenAndUser, userRouter.getUser);




module.exports = router; 