const Food = require("../../src/models/Food");
const repo = require("../../src/repositories/foodRepository");

jest.mock("../../src/models/Food");

describe("foodRepository", () => {
test("create llama Food.create", () => {
Food.create.mockResolvedValue(true);
repo.create({ a: 1 });
expect(Food.create).toHaveBeenCalledWith({ a: 1 });
});

test("listByUser llama find", () => {
repo.listByUser("USER1");
expect(Food.find).toHaveBeenCalledWith({ userId: "USER1" });
});

test("findById llama Food.findById", () => {
repo.findById("ID1");
expect(Food.findById).toHaveBeenCalledWith("ID1");
});

test("update llama findByIdAndUpdate", () => {
repo.update("ID1", { a: 1 });
expect(Food.findByIdAndUpdate).toHaveBeenCalledWith("ID1", { a: 1 }, { new: true });
});

test("delete llama findByIdAndDelete", () => {
repo.delete("ID1");
expect(Food.findByIdAndDelete).toHaveBeenCalledWith("ID1");
});
});