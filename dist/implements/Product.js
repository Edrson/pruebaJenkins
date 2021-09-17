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
const resGen_1 = require("../models/resGen");
//paquete de mongodb
const { MongoClient } = require('mongodb');
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
class Product {
    //^ Agregar producto ---------------------------------------------------------------------------------
    FGProductAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGProductAddBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Erro en metodo FGProductAdd");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductAddBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos para insertar producto
                const result = yield client.db("SAProject").collection("Categoria").updateOne({ _id: req.body.categoria }, { $push: { productos: { precio: req.body.precio, stock: req.body.stock, nombre: req.body.nombre, descripcion: req.body.descripcion, foto: req.body.foto, proveedor: req.body.proveedor } } });
                rg.valid = true;
                rg.data = result;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
            }
            finally {
                return rg;
            }
        });
    }
    //^ Catalogo de todos los productos---------------------------------------------------------------------
    FGCatalogue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                rg = yield this.FGCatalogueBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                        data: rg.data,
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Erro en metodo FGCatalogue");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGCatalogueBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos obtener todos los productos
                rg.valid = true;
                rg.data = [
                    {
                        categoria: "ropa",
                        precio: 100,
                        stock: 20,
                        nombre: "pantalon",
                        descripcion: "de caballero",
                        foto: "N/A",
                        proveedor: "cristian.ramirez@gmail.com",
                    },
                    {
                        categoria: "ropa",
                        precio: 100,
                        stock: 20,
                        nombre: "camisa polo",
                        descripcion: "de caballero",
                        foto: "N/A",
                        proveedor: "jorge.perez@gmail.com",
                    },
                ];
                return rg;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
                return rg;
            }
        });
    }
    //^ Productos de un proveedor en específico ---------------------------------------------------------------------
    FGProductSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                rg = yield this.FGProductSupplierBD(req.params.iduser);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                        data: rg.data,
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Erro en metodo FGCatalogue");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductSupplierBD(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos obtener todos los productos de un proveedor en específico
                rg.valid = true;
                rg.data = [
                    {
                        categoria: "ropa",
                        precio: 100,
                        stock: 20,
                        nombre: "pantalon",
                        descripcion: "de caballero",
                        foto: "N/A",
                        proveedor: "cristian.ramirez@gmail.com",
                    },
                    {
                        categoria: "zapatos",
                        precio: 200,
                        stock: 10,
                        nombre: "zapatos nike",
                        descripcion: "tenis de caballero",
                        foto: "N/A",
                        proveedor: "cristian.ramirez@gmail.com",
                    },
                ];
                return rg;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
                return rg;
            }
        });
    }
    //^ Actualizar producto
    FGProductUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                rg = yield this.FGProductUpdateBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Erro en metodo FGProductUpdate");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductUpdateBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos para modificar producto
                rg.valid = true;
                return rg;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
                return rg;
            }
        });
    }
}
exports.default = Product;
//# sourceMappingURL=Product.js.map