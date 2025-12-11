const authMiddleware = require("../../src/middleware/authMiddleware");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

const mockReq = (h = {}) => ({ headers: h });
const mockRes = () => {
const res = {};
res.status = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);
return res;
};

describe("authMiddleware", () => {
test("si no hay token → 401", () => {
const req = mockReq();
const res = mockRes();
const next = jest.fn();

authMiddleware(req, res, next);

expect(res.status).toHaveBeenCalledWith(401);
});

test("si token inválido → 403", () => {
const req = mockReq({ authorization: "Bearer XXX" });
const res = mockRes();
const next = jest.fn();

jwt.verify.mockImplementation(() => { throw new Error(); });

authMiddleware(req, res, next);

expect(res.status).toHaveBeenCalledWith(403);
});

test("si token válido → next()", () => {
const req = mockReq({ authorization: "Bearer VALID" });
const res = mockRes();
const next = jest.fn();

jwt.verify.mockReturnValue({ id: "USER1" });

authMiddleware(req, res, next);

expect(req.userId).toBe("USER1");
expect(next).toHaveBeenCalled();
});
});

