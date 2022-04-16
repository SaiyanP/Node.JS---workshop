const router = require("express").Router();
const dishRouter = require("../routes/dish.routes");

router.use("/dishes", dishRouter);


module.exports = router;