import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const {MongoClient} = require('mongodb');
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);

class Product {
  //^ Agregar producto ---------------------------------------------------------------------------------
  async FGProductAdd(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGProductAddBD(req);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Erro en metodo FGProductAdd");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }
  async FGProductAddBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consulta a la base de datos para insertar producto
      const result = await client.db("SAProject").collection("Categoria").updateOne({_id:req.body.categoria}, {$push: {productos: {precio:req.body.precio, stock:req.body.stock, nombre:req.body.nombre, descripcion:req.body.descripcion, foto:req.body.foto, proveedor:req.body.proveedor}}});
      rg.valid = true;
      rg.data = result;

    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
    }finally{
      return rg;
    }
  }

  //^ Catalogo de todos los productos---------------------------------------------------------------------
  async FGCatalogue(req: Request, res: Response) {
    try {
      let rg = new resGen();
      rg = await this.FGCatalogueBD(req);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
          data: rg.data,
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Erro en metodo FGCatalogue");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }
  async FGCatalogueBD(req: Request): Promise<any> {
    const rg = new resGen();
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
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }
  //^ Productos de un proveedor en específico ---------------------------------------------------------------------
  async FGProductSupplier(req: Request, res: Response) {
    try {
      let rg = new resGen();
      rg = await this.FGProductSupplierBD(req.params.iduser);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
          data: rg.data,
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Erro en metodo FGCatalogue");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }
  async FGProductSupplierBD(user: string): Promise<any> {
    const rg = new resGen();
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
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }
  //^ Actualizar producto
  async FGProductUpdate(req: Request, res: Response) {
    try {
      let rg = new resGen();
      rg = await this.FGProductUpdateBD(req);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Erro en metodo FGProductUpdate");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }
  async FGProductUpdateBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consulta a la base de datos para modificar producto

      rg.valid = true;
      return rg;
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }
}

export default Product;
