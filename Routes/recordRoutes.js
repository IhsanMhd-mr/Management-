import express from "express";
const router = express.Router();
import * as JwtService  from '../Services/JwtService.js';
import * as recController from '../Controllers/RecController.js';
// import multipart from 'multer'
import multipart from 'connect-multiparty'
var multipartMiddleware = multipart();

// import storage from "../config/multer.js";

router.post('/add-record',multipartMiddleware, recController.addRec);
router.get('/', recController.getAllRec);
router.put('/rec-id/:id',multipartMiddleware, recController.editRec);
router.get('/rec-id/:id', recController.recGetbyId);
router.delete('/delete-rec/:id', recController.deleteRecbyId);

router.get('/rec-client-id/:id', recController.recGetbyId);
router.get('/rec-dev-id/:id', recController.recGetbyId);
router.get('/rec-project-status/:id', recController.recGetbyId);
router.get('/rec-dev-id/:id', recController.recGetbyId);

export default router;
