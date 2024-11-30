import { User } from "../dbSchemers/userSchemer.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { validationResult,checkSchema,matchedData } from "express-validator";
import {request, Router } from "express";
import userValidationSchemer from "../utils/userValidationSchemer.mjs";

const router = Router();
//posting
router.post("/api/users",checkSchema(userValidationSchemer),
async(request,response) => {
    const result = validationResult(request);
    if(!result.isEmpty()) 
        return response.status(400).send({"error":result.array()});
    const data = matchedData(request);
    const newUser = new User(data)
    newUser.password = hashPassword(data.password);
    try {
        const savedUser = await newUser.save();
        return response.status(200).send(savedUser)     
    } catch (error) {
        console.log(error)
        return response.sendStatus(400);
    }
})
//geting
router.get("/api/users",async(request,response) => {
    console.log(request.session);
   // request.session.visited = true
    request.sessionStore.get(request.sessionID, (err,sessionData)=> {
        if(err) {
            console.log(err)
            throw err
        }          
        console.log(sessionData);
        console.log(request.sessionID);
    })
   const users = await User.find({})
   return response.status(200).send(users);

})

router.delete("/api/users",(request,respose) => {

})

export default router;
