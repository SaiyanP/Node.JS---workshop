const router = require("express").Router();
const DishController = require("../controllers/dish.controller");


//Get all dishes:
router.get("/all", DishController.fetchAllDishes);
//Add new dish:
router.post("/add", DishController.createNewDish);
//Get by id:
router.get("/:id", DishController.fetchDishById);
//Update:
router.patch("/:id/update", DishController.updateDish);
//Delete:
router.delete("/:id", DishController.deleteDish);

module.exports = router;