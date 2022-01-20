
const router = require("express").Router();
const knex   = require("../../config/database");


const {  genSaltSync , hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");



          
     getUsers= async (req, res) => {
      try{
        let data = await knex.select().table("registration");
        // const results = await getUsers(); 
        data.password=undefined;
        return res.json({
          success: 5,
          data: data
        });
      }
      catch(e){
         console.log("goldy",e);
        return res.json({
          success: 0,
          data: "something went wrong"
        });

      }
    };

    gettask= async (req, res) => {
      try{
        let data = req.body;
          data.userid=req.decoded.result.id;
        let data1 = await knex.select().table("task").where({userid : data.userid})
        // const results = await getUsers(); 
        data1.password=undefined;
        return res.json({
          success: 5,
          data: data1
        });
      }
      catch(e){
         console.log("goldy",e);
        return res.json({
          success: 0,
          data: "something went wrong"
        });

      }
    };

     create = async (req, res) => {
            try{
              let dada1 = req.body;
              let data2 = await knex.select().table("registration").where({email : dada1.email})
              if(data2 == false){
              const data = ({ firstName, lastName, gender, email, password, number} = req.body);
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        let data1 = await knex('registration').insert(data);
        
              return res.json({
                success: 5,
                data: data
              });
            }
            else{
              return res.json({
                success: 0,
                message: "same email not applicable"
              });

            }
            }
            catch(e){
              console.log(e);
              return res.json({
                
                success: 0,
                data: "something went wrong"
              });
            }
    };

    createtask = async (req, res) => {
      try{
        let data = req.body;
          data.userid=req.decoded.result.id;
          console.log(req.decoded);
  let data1 = await knex('task').insert(data);
  
        return res.json({
          success: 5,
          data: data1
        });
      }
      catch{
        return res.json({
          success: 0,
          data: "something went wrong"
        });
      }
};

    login = async (req, res) => {
      try{
        const body = req.body;
        let data = await knex('registration').where({
          email: body.email
          
        }).select()
         console.log(data[0]);
         const result = compareSync(body.password, data[0].password);
         if (!result) {
            return res.json({
               success: 0,
               data: "Invalid email or password"
           });
           }
        
        
        if (result) {
          result.password = undefined;
         
         
         
          const jsontoken = sign({ result: data[0] }, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
       
           console.log(result)
          
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          data: result
          
        });
        } 
        else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      // });
    }
    catch(e){
      console.log("goldy",e);
     return res.json({
       success: 0,
       data: "something went wrong"
     });

   }
    
  }
          
          
          
         








module.exports = { getUsers, login , create, createtask, gettask};
// module.exports = router;