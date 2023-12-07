import dbConnection from "../Configs/DbConnection.js";
import * as sqlQuaries from "../Utils/Sql.js";
import bcrypt from "bcrypt";

export const createDev = async (dev) => {  
  const encrypted_password = await bcrypt.hash(dev.password, 10);
    console.log(dev)
    const currentDate = new Date().toISOString().split("T")[0];
    try {
    return await new Promise((resolve, reject) => {
      dbConnection.query(sqlQuaries.insertDevQuery, [
        dev.username,
        dev.f_name,
        dev.l_name,
        dev.phone,
        dev.email,
        encrypted_password,
        dev.image,
        dev.documents,
        dev.description,
        dev.role,
        dev.start_date,
        dev.end_date
    ], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(result)
        resolve(result);
      }
    });
  });} catch (error) {
    console.error(error)
    throw error;
  }
};
export const editDev = async (data,dev_id) => {
      console.log(data,dev_id,"repo")
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        return await new Promise((resolve, reject) => {
            dbConnection.query(sqlQuaries.editDevQuery, [
              data.username,
              data.f_name,
              data.l_name,
              data.phone,
              data.email,
              // data.password,
              data.image,
              // data.documents,
              data.description,
              data.role,
              data.start_date,
              data.end_date,
              dev_id
          ], (err, result) => {
              if (err) {
                reject(err);
              } else {
                console.log(result)
                resolve(result);
              }
            })
        });
      } catch (error) {
        console.error(error)
        throw error;
      }
    };


    export const updateDev = async (data,dev_id) => {
      console.log(data,dev_id,"repo")
      try {
        return await new Promise((resolve, reject) => {
            dbConnection.query(sqlQuaries.updateDevDocQuery, 
              [ data.documents,dev_id ], 
              (err, result) => {
              if (err) {
                reject(err);
              } else {
                console.log(result)
                resolve(result);
              }
            })
        });
      } catch (error) {
        console.error(error)
        throw error;
      }
    };

export const getAllDev = async () => {
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.query(
        sqlQuaries.getAllDevQuery,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
export const getDevById = async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.query(
          sqlQuaries.getDevByIdQuery,
          [id],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (error) {
      throw error;
    }
  };
export const delDevById = async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.query(
          sqlQuaries.delDevByIdQuery,
          [id],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (error) {
      throw error;
    }
  };