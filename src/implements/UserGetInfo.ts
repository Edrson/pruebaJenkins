import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const {MongoClient} = require('mongodb');
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);


class UserGetInfo {
  async FGGetInfo(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGGetInfoBD(req.params.iduser);
      
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
          data: rg.data,
        });
      } else {
        res.statusCode = 500;
        res.json({ statusCode: res.statusCode, message: rg.message });
      }
    } catch (error) {
      console.log("Error en metodo FGGetInfo");
      //console.log(error);
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGGetInfoBD(user: string): Promise<any> {
    const rg = new resGen();
    try {
      //const result = await this.findOneListingByName(client, user);
      const result = await client.db("SAProject").collection("Usuario").findOne({_id:user});

      //console.log(result);
      rg.valid = true;
      //rg.data = { nombre: result.nombre + ' ' + result.apellido, _id: result._id };
      rg.data = result;
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    }finally{
      return rg;
    }
  }


  async findOneListingByName(client:any, user:string){
    try{
      const result = await client.db("SAProject").collection("Usuario").findOne({_id:user});
      console.log(result);
      return result;
    }
    catch(e)
    {
      return e;
    }
    
    /*
    if (result){
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    }else{
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
    */
}

}
export default UserGetInfo;
