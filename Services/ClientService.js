import * as clientRepository from '../Repositories/clientRepository.js';

import cookieParser from "cookie-parser";
import express from "express";
const app = express();
app.use(cookieParser());

export const createClient = async (body) => {
    try {
      const result = await clientRepository.createClient(body);
      if(result.affectedRows > 0){return { message: "Client added successfully", status :true };}else{return { message: "Client adding failed", status :false };}
    } catch (error) {
      throw error;
    }
  };


export const editClient = async (body,id) => {
    try {
      console.log(body,id,"dsta")
      const result=await clientRepository.editClient(body,id);
      if(result.affectedRows > 0){return { message: "Client edited successfully", status :true };}else{return { message: "Client data update failed", status :false };}
    } catch (error) {
      throw error;
    }
  };

  
export const updateClient = async (body,id) => {
  try {
    console.log(body,id,"dsta")
    const result=await clientRepository.updateClient(body,id);
    if(result.affectedRows > 0){return { message: "Client agreement updated successfully", status :true };}else{return { message: "Client agreement update failed", status :false };}
  } catch (error) {
    throw error;
  }
};

export const getAllClient = async () => {
    try {
      const results= await clientRepository.getAllClient();
      return { message: "Clients received successfully",data:results, status :true };
    } catch (error) {
      throw error;
    }
  };

export const getClientById = async (id) => {
    try {
      const result = await clientRepository.getClientById(id);
      // console.log(result)
      if(result.length > 0){return { message: "Client added successfully",data:result[0], status :true };}else{return { message: "Couldn't find Clienteloper Id in DB", status :false };}
    } catch (error) {
      throw error;
    }
  };

export const deleteClient = async (id) => {
    try {
      const exclient = await clientRepository.getClientById(id);
      if(exclient[0]){
        const result= await clientRepository.delClientById(id);
        if(result.affectedRows>0){return { message: "Client deleted successfully", status :true };}else{return { message: "Client deletion failed", status :false };}
      }else{return { message: "Couldn't find Clienteloper Id in DB", status :false };}
    } catch (error) {
      throw error;
    }
  };