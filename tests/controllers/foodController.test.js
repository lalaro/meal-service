const foodController = require("../../src/controllers/foodController");
const foodService = require("../../src/services/foodService");

jest.mock("../../src/services/foodService");

const mockReq = () => ({ body: {}, userId: "USER1" });
const mockRes = () => {
const res = {};
res.status = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);
return res;
};

describe("foodController", () => {
test("createFood responde json con resultado", async () => {
const req = mockReq();
const res = mockRes();
foodService.createFood.mockResolvedValue({ ok: true });


await foodController.createFood(req, res);

expect(res.json).toHaveBeenCalledWith({ ok: true });
});

test("createFood responde error en 400", async () => {
const req = mockReq();
const res = mockRes();
foodService.createFood.mockRejectedValue(new Error("X"));

await foodController.createFood(req, res);

expect(res.status).toHaveBeenCalledWith(400);
});

test("getFoods retorna lista", async () => {
const req = mockReq();
const res = mockRes();
foodService.getFoodsByUser.mockResolvedValue([{ a: 1 }]);

await foodController.getFoods(req, res);

expect(res.json).toHaveBeenCalledWith([{ a: 1 }]);
});
});