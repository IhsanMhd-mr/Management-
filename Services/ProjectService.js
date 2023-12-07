import * as projectRepository from '../Repositories/projectRepository.js';

import cookieParser from "cookie-parser";
import express from "express";
const app = express();
app.use(cookieParser());

export const createProject = async (body) => {
    try {
      const result = await projectRepository.createProject(body);
      if(result.affectedRows > 0){return { message: "Project added successfully", status :true };}else{return { message: "Project adding failed", status :false };}
    } catch (error) {
      throw error;
    }
  };


export const editProject = async (body,id) => {
    try {
      console.log(body,id,"dsta")
      const result=await projectRepository.editProject(body,id);
      if(result.affectedRows > 0){return { message: "Project edited successfully", status :true };}else{return { message: "Project data update failed", status :false };}
    } catch (error) {
      throw error;
    }
  };

  
export const updateProject = async (body,id) => {
  try {
    console.log(body,id,"dsta")
    const result=await projectRepository.updateProject(body,id);
    if(result.affectedRows > 0){return { message: "Project agreement updated successfully", status :true };}else{return { message: "Project agreement update failed", status :false };}
  } catch (error) {
    throw error;
  }
};

export const getAllProject = async () => {
    try {
      const results= await projectRepository.getAllProject();
      return { message: "Projects received successfully",data:results, status :true };
    } catch (error) {
      throw error;
    }
  };

export const getProjectById = async (id) => {
    try {
      const result = await projectRepository.getProjectById(id);
      // console.log(result)
      if(result.length > 0){return { message: "Project added successfully",data:result[0], status :true };}else{return { message: "Couldn't find Projecteloper Id in DB", status :false };}
    } catch (error) {
      throw error;
    }
  };

export const deleteProject = async (id) => {
    try {
      const exproject = await projectRepository.getProjectById(id);
      if(exproject[0]){
        const result= await projectRepository.delProjectById(id);
        if(result.affectedRows>0){return { message: "Project deleted successfully", status :true };}else{return { message: "Project deletion failed", status :false };}
      }else{return { message: "Couldn't find Projecteloper Id in DB", status :false };}
    } catch (error) {
      throw error;
    }
  };