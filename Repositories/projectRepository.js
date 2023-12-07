import dbConnection from "../Configs/DbConnection.js";
import * as sqlQuaries from "../Utils/Sql.js";

export const createProject = async (project) => {  
    console.log(project)
    const currentDate = new Date().toISOString().split("T")[0];
    try {
    return await new Promise((resolve, reject) => {
      dbConnection.query(sqlQuaries.insertProjectQuery, [
        // project.agreement_id,
        project.client_id,
        project.title,
        project.logo,
        project.status,
        project.budget,
        project.start_date,
        project.deadline,
        project.end_date,
        project.description
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
export const editProject = async (project,project_id) => {
      console.log(project,project_id,"repo")
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        return await new Promise((resolve, reject) => {
            dbConnection.query(sqlQuaries.editProjectQuery, [
              project.client_id,
              project.title,
              project.logo,
              project.status,
              project.budget,
              project.start_date,
              project.deadline,
              project.end_date,
              project.description
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


    // export const updateProject = async (data,project_id) => {
    //   console.log(data,project_id,"repo")
    //   try {
    //     return await new Promise((resolve, reject) => {
    //         dbConnection.query(sqlQuaries.updateProjectDocQuery, 
    //           [ data.documents,project_id ], 
    //           (err, result) => {
    //           if (err) {
    //             reject(err);
    //           } else {
    //             console.log(result)
    //             resolve(result);
    //           }
    //         })
    //     });
    //   } catch (error) {
    //     console.error(error)
    //     throw error;
    //   }
    // };

export const getAllProject = async () => {
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.query(
        sqlQuaries.getAllProjectQuery,
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
export const getProjectById = async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.query(
          sqlQuaries.getProjectByIdQuery,
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
export const delProjectById = async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        dbConnection.query(
          sqlQuaries.delProjectByIdQuery,
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