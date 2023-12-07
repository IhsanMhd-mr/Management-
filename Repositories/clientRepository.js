import dbConnection from "../Configs/DbConnection.js";
import * as sqlQuaries from "../Utils/Sql.js";
import bcrypt from "bcrypt";

export const createClient = async (client) => {  
  const encrypted_password = await bcrypt.hash(client.password, 10);
    console.log(client)
    const currentDate = new Date().toISOString().split("T")[0];
    try {
    return await new Promise((resolve, reject) => {
      dbConnection.query(sqlQuaries.insertClientQuery, [
        client.f_name,
        client.l_name,
        client.country,
        client.phone,
        client.email,
        encrypted_password,
        client.image,
        client.documents,
        client.description,
        client.role,
        client.start_date,
        client.end_date
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
export const editClient = async (data,client_id) => {
      console.log(data,client_id,"repo")
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        return await new Promise((resolve, reject) => {
            dbConnection.query(sqlQuaries.editClientQuery, [              
              data.f_name,
              data.l_name,
              data.country,
              data.phone,
              data.email,
              // data.password,
              data.image,
              // data.documents,
              data.description,
              data.role,
              data.start_date,
              data.end_date,
              client_id
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


    export const updateClient = async (data,client_id) => {
      console.log(data,client_id,"repo")
      try {
        return await new Promise((resolve, reject) => {
            dbConnection.query(sqlQuaries.updateClientDocQuery, 
              [ data.documents,client_id ], 
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

export const getAllClient = async () => {
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.query(
        sqlQuaries.getAllClientQuery,
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
export const getClientById = async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.query(
          sqlQuaries.getClientByIdQuery,
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
export const delClientById = async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.query(
          sqlQuaries.delClientByIdQuery,
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