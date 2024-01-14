"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const pg_1 = require("pg");
const DataBasePassword_1 = require("../DataBasePassword");
const client = new pg_1.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Blog',
    password: DataBasePassword_1.postgresPassword,
    port: 5432
});
function blogConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("connect to postgres");
        }
        catch (error) {
            console.error("error connecting to postgres" + error);
        }
    });
}
blogConnect();
function getClient() {
    return client;
}
exports.getClient = getClient;
