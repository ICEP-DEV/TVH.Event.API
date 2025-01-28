const {
  attendeeCreate,
  mobileLogin,
  organiserCreate,
  adminCreate,
  webuserLogin,
  generateOtp,
} = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/web/login", webuserLogin);
router.post("/web/admin", adminCreate);
router.post("/web/organiser", organiserCreate);
router.post("/mobile/login", mobileLogin);
router.post("/mobile/create", attendeeCreate);
router.get("/otp/:email", generateOtp);

module.exports = router;
