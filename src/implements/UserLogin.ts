import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const {MongoClient} = require('mongodb');
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);


class UserLogin {
  async FGLogin(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGLoginBD(req);

      if (rg.valid == true) {
        //TODO verificar la respuesta de la base de datos, si las credenciales son correctas o incorrectas, y verificar tipo de usuario
        //^Si las credenciales son correctas setear variable log en true
        let log = true;
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
          login: {
            correct: log,
            userType: rg.data.tipo,
          },
        });
      }else{
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
          login: {
            correct: false,
            userType: null,
          },
        });
      }
    } catch (error) {
      console.log("Error en metodo FGLogin");
      res.statusCode = 500;
      res.json({ statusCode: res.statusCode, message: (error as Error).message });
    }
  }

  async FGLoginBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //console.log();
      
      const result = await client.db("SAProject").collection("Usuario").findOne({_id:req.body._id, password:req.body.password});

      if (result){
        rg.valid = true;
        rg.data = result;
      }else{
        rg.valid = false;
        //rg.data = result;
        rg.message = "Credenciales no válidas";
      }
      
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  }
}
export default UserLogin;
