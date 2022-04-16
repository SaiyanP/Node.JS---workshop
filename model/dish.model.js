const path = require("path");
const DataService = require("../service/data.service");
const { v4: uuid } = require("uuid");

const dishPath = path.join(__dirname, "..", "data", "dish.json");

// CRUD Operations:

class DishModel {
    //GET:
    static async getAllDishes() {
        return DataService.readJSONFile(dishPath);
    }
    //ID:
    static async getDishById(dishID) {
        const dishes = await this.getAllDishes();

        const foundDish = dishes.find(dish => dish.id === dishID);

        if (foundDish) {
            return foundDish;
        } else {
            return Promise.reject({ msg: "No dish found." });
        }
    }

    //POST:
    static async addNewDish(newDishData) {
        const dishes = await this.getAllDishes();
        const newDish = {
            id: uuid(),
            ...newDishData,
        };
        const updatedDishes = [...dishes, newDish]
        await DataService.saveJSONFile(dishPath, updatedDishes);
        return newDish
    }
    //Update:
    static async patchDish(dishId, dishUpdateData) {
        const dishes = await this.getAllDishes();

        const foundDish = await this.getDishById(dishId);

        const updatedDish = { ...foundDish, ...dishUpdateData };

        const updatedDishes = dishes.map(dish =>
            dish.id === foundDish.id ? updatedDish : dish
        );
        await DataService.saveJSONFile(dishPath, updatedDishes);
    }
    //Delete:
    static async deleteDish(dishId) {
        const dish = await this.getAllDishes();

        const updatedDishes = dish.filter(
            dish => dish.id !== dishId
        );

        if (updatedDishes.length === dish.length)
            return Promise.reject({ msg: "Dish Not Found" });

        await DataService.saveJSONFile(dishPath, updatedDishes);
    }
}



module.exports = DishModel