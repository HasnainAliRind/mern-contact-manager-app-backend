import express from "express";
import HandleSignup from "../Auth/SignupHandler.js";
import LoginHandler from "../Auth/LoginHandler.js";
import {createContact , updateContact , deleteContact, getContact, deleteMultipleContacts} from '../DB_Operations/CRUD_Contact.js';
import { createList, deleteList, getListsData, updateList } from "../DB_Operations/CRUD_List.js";
import HandleLogout from "../Auth/LogoutHandler.js";

let router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        if (req.session.user) {
            return res.json({valid: true , userInfo: req.session.user});
        }else{
            return res.json({valid: false});
        }
    });
    // Routes for handling signup and login
    router.post("/signup", HandleSignup);
    router.post("/login",LoginHandler);
    router.get("/logout", HandleLogout);
    
    // Routes for crud operation of contact
    router.get("/get-contact/:id",getContact);
    router.post("/create-contact",createContact);
    router.put("/update-contact",updateContact);
    router.delete("/delete-contact/:id", deleteContact);
    router.delete("/delete-multiple/:list", deleteMultipleContacts);


    // Routes for crud operations of list
    router.get("/lists",getListsData);
    router.post("/create-list",createList);
    router.put("/update-list",updateList);
    router.delete("/delete-list/:id", deleteList);

    return app.use("/" , router);
};


export default initWebRoutes;