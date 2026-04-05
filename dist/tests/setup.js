"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../src/config/database"));
beforeAll(async () => {
    // Clear the database or migrate
    await database_1.default.transaction.deleteMany();
    await database_1.default.user.deleteMany();
});
afterAll(async () => {
    await database_1.default.$disconnect();
});
//# sourceMappingURL=setup.js.map