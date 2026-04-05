"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({
            email: 'testauth@finance.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.token).toBeDefined();
    });
    it('should not register user with existing email', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({
            email: 'testauth@finance.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(400);
    });
    it('should login an existing user', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({
            email: 'testauth@finance.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.token).toBeDefined();
    });
});
//# sourceMappingURL=auth.test.js.map