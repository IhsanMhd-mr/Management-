// Devs
export const insertDevQuery = 
`INSERT INTO devs (dev_id, username, f_name, l_name, phone, email, password, image, documents, description, role, start_date, end_date) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

export const editDevQuery = 
`UPDATE devs SET username = ?, f_name = ?, l_name = ?, phone = ?, email = ?, image = ?, description = ?, role = ?, start_date = ?, end_date = ? WHERE dev_id = ? `

export const  updateDevDocQuery = `UPDATE devs SET documents = ? WHERE dev_id = ? `

export const getAllDevQuery = `SELECT * FROM devs`

export const getDevByIdQuery = `SELECT * FROM devs WHERE dev_id = ?`

export const delDevByIdQuery = `DELETE FROM devs WHERE dev_id = ?`

// Clients
export const insertClientQuery = 
`INSERT INTO clients (client_id, f_name, l_name, country, phone, email, password, image, documents, description, role, start_date, end_date) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

export const editClientQuery = 
`UPDATE clients SET f_name = ?, l_name = ?, country = ?, phone = ?, email = ?, image = ?, description = ?, role = ?, start_date = ?, end_date = ? WHERE client_id = ? `

export const  updateClientDocQuery = `UPDATE clients SET documents = ? WHERE client_id = ? `

export const getAllClientQuery = `SELECT * FROM clients`

export const getClientByIdQuery = `SELECT * FROM clients WHERE client_id = ?`

export const delClientByIdQuery = `DELETE FROM clients WHERE client_id = ?`


//  Projects
export const insertProjectQuery = 
`INSERT INTO projects (project_id, client_id, title, logo, status, budget, start_date, deadline, end_date,description) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?)`

export const editProjectQuery = 
`UPDATE projects SET client_id = ?, title = ?, logo = ?, status = ?, budget = ?, start_date = ?, deadline = ?, end_date = ?,description = ? WHERE project_id = ? `

export const getAllProjectQuery = `SELECT * FROM projects`

export const getProjectByIdQuery = `SELECT * FROM projects WHERE client_id = ?`

export const delProjectByIdQuery = `DELETE FROM projects WHERE client_id = ?`

// 
