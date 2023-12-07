import * as devRepository from '../Repositories/devRepository.js';

import cookieParser from "cookie-parser";
import express from "express";
const app = express();
app.use(cookieParser());

export const createDev = async (body) => {
    try {
      const result = await devRepository.createDev(body);
      if(result.affectedRows > 0){return { message: "Dev added successfully", status :true };}else{return { message: "Dev adding failed", status :false };}
    } catch (error) {
      throw error;
    }
  };


export const editDev = async (body,id) => {
    try {
      console.log(body,id,"dsta")
      const result=await devRepository.editDev(body,id);
      if(result.affectedRows > 0){return { message: "Dev edited successfully", status :true };}else{return { message: "Dev data update failed", status :false };}
    } catch (error) {
      throw error;
    }
  };

  
export const updateDev = async (body,id) => {
  try {
    console.log(body,id,"dsta")
    const result=await devRepository.updateDev(body,id);
    if(result.affectedRows > 0){return { message: "Dev agreement updated successfully", status :true };}else{return { message: "Dev agreement update failed", status :false };}
  } catch (error) {
    throw error;
  }
};

export const getAllDev = async () => {
    try {
      const results= await devRepository.getAllDev();
      return { message: "Devs received successfully",data:results, status :true };
    } catch (error) {
      throw error;
    }
  };

export const getDevById = async (id) => {
    try {
      const result = await devRepository.getDevById(id);
      // console.log(result)
      if(result.length > 0){return { message: "Dev added successfully",data:result[0], status :true };}else{return { message: "Couldn't find Developer Id in DB", status :false };}
    } catch (error) {
      throw error;
    }
  };

export const deleteDev = async (id) => {
    try {
      const exdev = await devRepository.getDevById(id);
      if(exdev[0]){
        const result= await devRepository.delDevById(id);
        if(result.affectedRows>0){return { message: "Dev deleted successfully", status :true };}else{return { message: "Dev deletion failed", status :false };}
      }else{return { message: "Couldn't find Developer Id in DB", status :false };}
    } catch (error) {
      throw error;
    }
  };