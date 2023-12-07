import express from "express";
const router = express.Router();
import * as JwtService  from '../Services/JwtService.js';
import * as devController from '../Controllers/DevController.js';
// import multipart from 'multer'
import multipart from 'connect-multiparty'
var multipartMiddleware = multipart();

// import storage from "../config/multer.js";

router.post('/createDev',multipartMiddleware, devController.createDev);
router.get('/', devController.getAllDev);
router.put('/dev-id/:id',multipartMiddleware, devController.editDev);
router.put('/dev-agreement/:id',multipartMiddleware, devController.updateDocumentDev);
router.get('/dev-id/:id', devController.devGetbyId);
router.delete('/delete-dev/:id', devController.deleteDevbyId);

export default router;
