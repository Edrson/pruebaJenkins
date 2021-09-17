import UserDB from "./implements/UserDB";
import UserImp from "./implements/UserImp";
import UserLogin from "./implements/UserLogin";
import UserGetInfo from "./implements/UserGetInfo";
import Product from "./implements/Product";

const express = require("express");
const app = express();
import { NextFunction, Request, Response } from "express";
import morgan from "morgan";

const PORT = 3000;

var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

//^Instanciar los objetos-----------
const userDB = new UserDB();
const user = new UserImp(userDB);
const userLogin = new UserLogin();
const userGetInfo = new UserGetInfo();
const product = new Product();
//^Finaliza instanciar objetos------

//*test
app.get("/", (req: Request, res: Response) => {
  console.log("test get...");
  res.status(200).send("Holis tu");
});

//*Agregar usuario
app.post("/sa/user/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await user.FGUserAdd(req, res);
  } catch (e) {
    next(e);
  }
});
//*login
app.post("/sa/user/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userLogin.FGLogin(req, res);
  } catch (e) {
    next(e);
  }
});
//*Mostrar todos los datos de un usuario, cliente o proveedor
app.get("/sa/user/data/:iduser", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userGetInfo.FGGetInfo(req, res);
  } catch (e) {
    next(e);
  }
});
//*Agregar producto a la tienda
app.post("/sa/product/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGProductAdd(req, res);
  } catch (e) {
    next(e);
  }
});
//*Actualizar producto
app.post("/sa/product/update", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGProductUpdate(req, res);
  } catch (e) {
    next(e);
  }
});
//*Catalogo general de productos
app.get("/sa/Catalogue", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGCatalogue(req, res);
  } catch (e) {
    next(e);
  }
});
//*Mostrar todos los productos de un proveedor
app.get("/sa/product/proveedor/:iduser", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGProductSupplier(req, res);
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
