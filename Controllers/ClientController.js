import * as clientService from '../Services/ClientService.js';
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
export const createClient = async (req, res) => {
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
        const dateTime = new Date();
        var uploadedFiles=null;
        if(req.files && req.files.image){
          uploadedFiles = await handleAndUploadFiles([req.files.image], dateTime);
    
          body.image = uploadedFiles[0];}else{body.image = '';}
      const result = await clientService.createClient(body);
  
      if(result.status){
        res.status(200).json({message :result.message, status:true});
      }else{
        res.status(400).json({message :result.message, status:false});
      }  } catch (error) {
        console.error(error)
      res.status(400).json({ error: error.message||"Internal Server Error" , status:false});
    }
  };
export const editClient = async (req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "data is missing in the request body", status:false });
    }
    
    try {

      const exdata = await clientService.getClientById(req.params.id);
      
      console.log(exdata.data.client_id)
      if(!exdata.status){
        console.log(req.params)
        return res
        .status(410)
        .json({ error: "Client id is missing in the request params", status:false });}
        const exclient = exdata.data;
        const client_id = exclient.client_id;

      const  body  = req.body;
        // console.log(body,client_id)
        const dateTime = new Date();
        var uploadedFiles=null;
        if(req.files && req.files.image){
          uploadedFiles = await handleAndUploadFiles([req.files.image], dateTime);
    
          body.image = uploadedFiles[0];}else{body.image = exclient.image;}
//
// --> if not replace with exclient data here <--
//
      const result = await clientService.editClient(body,client_id);
  
      if(result.status){
        res.status(200).json({message :result.message, status:true});
      }else{
        res.status(400).json({message :result.message, status:false});
      }  } catch (error) {
        console.error(error)
      res.status(400).json({ error: error.message||"Internal Server Error" , status:false});
    }
  };

export const updateDocumentClient = async (req, res) => {
    if (!req.body) {
        return res
          .status(400)
          .json({ error: "data is missing in the request body", status:false });
      }
    if(!req.files.document||!req.files.document.type){
        return res
        .status(400)
        .json({ status:false, message: "Inserted File Not Valid" });}

  // const exdata = await clientService.getClientById(req.params.id);
      
  // console.log(exdata.data.client_id)
      // const id = req.params.client;
      const exresult = await clientService.getClientById(req.params.id);
      console.log(exresult.data)
      if (!exresult.status) {
        res
          .status(400)
          .json({ status: false, message: "Client Id cannot be found in the DB" });
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
          const result = await clientService.updateClient(req.body,exresult.data.client_id)
  
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

export const getAllClient = async (req, res) => {
    try{
        const result = await clientService.getAllClient();
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

export const clientGetbyId = async (req, res) => {
    try {
        const client_id = req.params.id;
        const result = await clientService.getClientById(client_id);
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

export const deleteClientbyId = async (req, res) => {
    const id = req.params.id;
    // console.log(id)
        try{
            const result = await clientService.deleteClient(id)
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
