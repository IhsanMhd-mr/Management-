import express from "express";
const router = express.Router();
import * as JwtService  from '../Services/JwtService.js';
import * as projectController from '../Controllers/ProjectController.js';
// import multipart from 'multer'
import multipart from 'connect-multiparty'
var multipartMiddleware = multipart();

// import storage from "../config/multer.js";

router.post('/createProject',multipartMiddleware, projectController.createProject);
router.get('/', projectController.getAllProject);
router.put('/project-id/:id',multipartMiddleware, projectController.editProject);
// router.put('/project-docs/:id',multipartMiddleware, projectController.updateDocumentProject);
router.get('/project-id/:id', projectController.projectGetbyId);
router.delete('/delete-project/:id', projectController.deleteProjectbyId);

export default router;
