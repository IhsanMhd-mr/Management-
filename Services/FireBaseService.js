import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
  } from "firebase/storage";
  import fs from "fs";

export const uploadImage = async (req,storage,dateTime) => {
    try {
      
      const storageRef = ref(
        storage,
        `files/${req.files.image.originalFilename + " " + dateTime}`
      );

      const contentType = req.files.image.type || "application/octet-stream";
      const metadata = {
        contentType,
      };

      const file = await fs.promises.readFile(req.files.image.path);

      const snapshot = await uploadBytesResumable(storageRef, file, metadata);

      const downloadURL = await getDownloadURL(snapshot.ref);

      return { status:true,message: "uploaded successfully",url:downloadURL };
  
      } catch (error) {
        return { status:false,message: error.message };
      }
  }

  export const uploadDocument = async (document,storage,dateTime) => {
    try {

        const storageRef = ref(
            storage,
            `files/${document.originalFilename + " " + dateTime}`
          );

          const contentType = document.type || "application/octet-stream";
          const metadata = {
            contentType,
          };

          const file = await fs.promises.readFile(document.path);

          const snapshot = await uploadBytesResumable(
            storageRef,
            file,
            metadata
          );

          const downloadURL = await getDownloadURL(snapshot.ref);

      return { status:true,message: "uploaded successfully",url:downloadURL };
  
      } catch (error) {
        return { status:false,message: error.message };
      }
  }
  