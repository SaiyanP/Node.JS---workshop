const DishModel = require("../model/dish.model");

class DishController {
    static async fetchAllDishes(req, res) {
        try {
            const dishes = await DishModel.getAllDishes();
            res.status(200).send(dishes);
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static async fetchDishById(req, res) {
        try {
            const { id: dishId } = req.params;

            const dish = await DishModel.getDishById(dishId);
            res.status(200).send(dish);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async createNewDish(req, res) {
        try {
            const newDishData = req.body;
            const createdDish = await DishModel.addNewDish(newDishData);
            res.status(201).send(createdDish);
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async updateDish(req, res) {
        try {
            const dishId = req.params.id;
            const dishUpdates = req.body;

            if (dishUpdates.id) res.status(400).send({ msg: "Invalid Update" });

            await DishModel.patchDish(dishId, dishUpdates);

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    static async deleteDish(req, res) {
        try {
            const dishId = req.params.id;
            await DishModel.deleteDish(dishId);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = DishController;