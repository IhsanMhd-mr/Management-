import * as devService from '../Services/DevService.js';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import fs from "fs";


// function for file handling and uploading
const handleAndUploadFiles = async (files, dateTime, additionalPath = "") => {
  const storage = getStorage();
  const uploadedFiles = [];
// console.log(files)
  for (const file of files) {
    if (file.type !== null) {
      const storageRef = ref(
        storage,
        `files/${file.originalFilename + " " + dateTime + " " + additionalPath}`
      );

      const metadata = {
        contentType: file.type,
      };

      const fileData = await fs.promises.readFile(file.path);

      const snapshot = await uploadBytesResumable(storageRef, fileData, metadata);

      const downloadURL = await getDownloadURL(snapshot.ref);

      uploadedFiles.push(downloadURL);
    } else {
      uploadedFiles.push(""); // Empty URL for files with null types
    }
  }

  return uploadedFiles;
};


// Handle developer records
export const addRecord = async (req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "data is missing in the request body", status:false });
    }
    console.log(req.body)
    const  body  = req.body;
    // var image;
    //     if (req.files.image.name) {
    //       image = await imageUpload(req);
    //     } else {
    //       image = null;
    //     }
    try {
      console.log(body)
        
      const result = await devService.createRec(body);
  
      if(result.status){
        res.status(200).json({message :result.message, status:true});
      }else{
        res.status(400).json({message :result.message, status:false});
      }  } catch (error) {
        console.error(error)
      res.status(400).json({ error: error.message||"Internal Server Error" , status:false});
    }
  };
export const editDev = async (req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "data is missing in the request body", status:false });
    }
    
    try {

      const exdata = await devService.getDevById(req.params.id);
      
      console.log(exdata.data.dev_id)
      if(!exdata.status){
        console.log(req.params)
        return res
        .status(410)
        .json({ error: "Dev id is missing in the request params", status:false });}
        const exdev = exdata.data;
        const dev_id = exdev.dev_id;

      const  body  = req.body;
        // console.log(body,dev_id)
        const dateTime = new Date();
        var uploadedFiles=null;
        if(req.files && req.files.image){
          uploadedFiles = await handleAndUploadFiles([req.files.image], dateTime);
    
          body.image = uploadedFiles[0];}else{body.image = exdev.image;}
//
// --> if not replace with exdev data here <--
//
      const result = await devService.editDev(body,dev_id);
  
      if(result.status){
        res.status(200).json({message :result.message, status:true});
      }else{
        res.status(400).json({message :result.message, status:false});
      }  } catch (error) {
        console.error(error)
      res.status(400).json({ error: error.message||"Internal Server Error" , status:false});
    }
  };

export const updateDocumentDev = async (req, res) => {
    if (!req.body) {
        return res
          .status(400)
          .json({ error: "data is missing in the request body", status:false });
      }
    if(!req.files.document||!req.files.document.type){
        return res
        .status(400)
        .json({ status:false, message: "Inserted File Not Valid" });}

  // const exdata = await devService.getDevById(req.params.id);
      
  // console.log(exdata.data.dev_id)
      // const id = req.params.dev;
      const exresult = await devService.getDevById(req.params.id);
      console.log(exresult.data)
      if (!exresult.status) {
        res
          .status(400)
          .json({ status: false, message: "Dev Id cannot be found in the DB" });
        return;
       } 

      const storage = getStorage();
      const dateTime = new Date();
      const spliteName = req.files.document.originalFilename.split( "." )
      if(spliteName[1].toLowerCase() != "pdf"){
          return res
          .status(400)
          .json({ error: "Pdf only allowed" });
      }
      if (req.files.document.type !== null) {
          const storageRef = ref(
            storage,
            `files/${req.files.document.originalFilename + "       " + dateTime}`
          );
    
          const metadata = {
            contentType: req.files.document.type,
          };
    
          const file = await fs.promises.readFile(req.files.document.path);      
          const snapshot = await uploadBytesResumable(storageRef, file, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);      
          req.body.document = downloadURL;
          req.body.document_name = req.files.document.originalFilename;
        } else {
          // req.body.document = "";
          req.body.document = exresult.data.document||'';
          req.body.document_name = exresult.data.originalFilename||'';
        }
  
      try {
          const result = await devService.updateDev(req.body,exresult.data.dev_id)
  
      if(result.status){
          return res
          .status(200)
          .json({ status:result.status, message: result.message });
      }else{
          return res
          .status(410)
          .json({ status:result.status, message: result.message });
      }
      } catch (error) {
          return res
          .status(400)
          .json({ status:false, message: error.message });
      }
  };

export const getAllDev = async (req, res) => {
    try{
        const result = await devService.getAllDev();
        if (result.status) {
          res
            .status(200)
            .json({ status: true, message: result.message, data: result.data });
        } else {
          res.status(400).json({ status: false, message: result });
        }
    }catch (error) {
    return res
    .status(400)
    .json({ status:false, message: error.message });
}
  };

export const devGetbyId = async (req, res) => {
    try {
        const dev_id = req.params.id;
        const result = await devService.getDevById(dev_id);
        if (result.status) {
          res
            .status(200)
            .json({ status: true, message: result.message, data: result.data });
        } else {
          res.status(400).json({ status: false, message: result.message });
        }
      } catch (error) {
        res.status(400).json({ status: false, error: error.message });
      }
  };

export const deleteDevbyId = async (req, res) => {
    const id = req.params.id;
    // console.log(id)
        try{
            const result = await devService.deleteDev(id)
            if (result.status) {
              res
                .status(200)
                .json({ status: true, message: result.message, data: result.data });
            } else {
              res.status(400).json({ status: false, message: result.message });
            }
        }catch (error) {
        return res
        .status(400)
        .json({ status:false, message: error.message });
    }
  };
