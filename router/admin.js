const express = require("express");
const {
  ChangeStatus,
  getAllChef,
  AllClient,
  BannUser,
  deleteUser,
} = require("../controllers/admin.controllers");
const isAdmin = require("../middleware/admin");
const router = express.Router();
const isAuth = require("../middleware/auth");

router.put("/changeStatus/:id", isAuth, isAdmin, ChangeStatus);
router.put("/bannedUser/:id", isAuth, isAdmin, BannUser);
router.delete("/deleteUser/:id", isAuth, isAdmin, deleteUser);
router.get("/allChef", isAuth, isAdmin, getAllChef);
router.get("/allClient", isAuth, isAdmin, AllClient);

module.exports = router;
