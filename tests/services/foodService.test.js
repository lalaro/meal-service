const foodRepository = require("../../src/repositories/foodRepository");
const foodService = require("../../src/services/foodService");

jest.mock("../../src/repositories/foodRepository");

describe("foodService", () => {
test("createFood agrega userId y llama repository.create", async () => {
foodRepository.create.mockResolvedValue({ ok: true });

const result = await foodService.createFood("USER1", { tipo: "cena" });

expect(foodRepository.create).toHaveBeenCalledWith({ tipo: "cena", userId: "USER1" });
expect(result).toEqual({ ok: true });
});

test("getFoodsByUser llama listByUser", async () => {
foodRepository.listByUser.mockResolvedValue([{ id: 1 }]);

const result = await foodService.getFoodsByUser("USER1");

expect(foodRepository.listByUser).toHaveBeenCalledWith("USER1");
expect(result).toEqual([{ id: 1 }]);
});

test("updateFood lanza error si no existe", async () => {
foodRepository.findById.mockResolvedValue(null);

await expect(
  foodService.updateFood("FOOD1", "USER1", {})
).rejects.toThrow("Comida no encontrada");
});

test("updateFood lanza error si userId no coincide", async () => {
foodRepository.findById.mockResolvedValue({ userId: "OTHER" });

await expect(
  foodService.updateFood("FOOD1", "USER1", {})
).rejects.toThrow("No autorizado");
});

test("updateFood actualiza correctamente", async () => {
foodRepository.findById.mockResolvedValue({ userId: "USER1" });
foodRepository.update.mockResolvedValue({ ok: true });

const result = await foodService.updateFood("FOOD1", "USER1", { a: 1 });

expect(foodRepository.update).toHaveBeenCalledWith("FOOD1", { a: 1 });
expect(result).toEqual({ ok: true });
});
});