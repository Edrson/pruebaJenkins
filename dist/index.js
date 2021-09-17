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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDB_1 = __importDefault(require("./implements/UserDB"));
const UserImp_1 = __importDefault(require("./implements/UserImp"));
const UserLogin_1 = __importDefault(require("./implements/UserLogin"));
const UserGetInfo_1 = __importDefault(require("./implements/UserGetInfo"));
const Product_1 = __importDefault(require("./implements/Product"));
const express = require("express");
const app = express();
const morgan_1 = __importDefault(require("morgan"));
const PORT = 3000;
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(morgan_1.default("dev"));
//^Instanciar los objetos-----------
const userDB = new UserDB_1.default();
const user = new UserImp_1.default(userDB);
const userLogin = new UserLogin_1.default();
const userGetInfo = new UserGetInfo_1.default();
const product = new Product_1.default();
//^Finaliza instanciar objetos------
//*test
app.get("/", (req, res) => {
    console.log("test get...");
    res.status(200).send("Holis tu");
});
//*Agregar usuario
app.post("/sa/user/add", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.FGUserAdd(req, res);
    }
    catch (e) {
        next(e);
    }
}));
//*login
app.post("/sa/user/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userLogin.FGLogin(req, res);
    }
    catch (e) {
        next(e);
    }
}));
//*Mostrar todos los datos de un usuario, cliente o proveedor
app.get("/sa/user/data/:iduser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userGetInfo.FGGetInfo(req, res);
    }
    catch (e) {
        next(e);
    }
}));
//*Agregar producto a la tienda
app.post("/sa/product/add", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product.FGProductAdd(req, res);
    }
    catch (e) {
        next(e);
    }
}));
//*Actualizar producto
app.post("/sa/product/update", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product.FGProductUpdate(req, res);
    }
    catch (e) {
        next(e);
    }
}));
//*Catalogo general de productos
app.get("/sa/Catalogue", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product.FGCatalogue(req, res);
    }
    catch (e) {
        next(e);
    }
}));
//*Mostrar todos los productos de un proveedor
app.get("/sa/product/proveedor/:iduser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product.FGProductSupplier(req, res);
    }
    catch (e) {
        next(e);
    }
}));
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map