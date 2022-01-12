const router = require("express").Router();
const { checkToken,checkAdminToken,checkCustomerToken } = require("../../auth/token_validation");
const {createUser,login,getUserByUserId,getUsers,updateUsers,deleteUser
} = require("./user.controller");

router.post("/login", login);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);

router.post("/",checkAdminToken, createUser);
router.patch("/", checkAdminToken, updateUsers);
router.delete("/", checkAdminToken, deleteUser);

module.exports = router;
