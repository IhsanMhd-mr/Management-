import express from "express";
const router = express.Router();
import * as JwtService  from '../Services/JwtService.js';
import * as clientController from '../Controllers/ClientController.js';
// import multipart from 'multer'
import multipart from 'connect-multiparty'
var multipartMiddleware = multipart();

// import storage from "../config/multer.js";

router.post('/createClient',multipartMiddleware, clientController.createClient);
router.get('/', clientController.getAllClient);
router.put('/client-id/:id',multipartMiddleware, clientController.editClient);
router.put('/client-agreement/:id',multipartMiddleware, clientController.updateDocumentClient);
router.get('/client-id/:id', clientController.clientGetbyId);
router.delete('/delete-client/:id', clientController.deleteClientbyId);

export default router;
