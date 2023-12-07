CREATE DATABASE hms;
use hms;

CREATE TABLE devs(
  dev_id VARCHAR(36) NOT NULL PRIMARY KEY,
  username VARCHAR(36) NOT NULL,
  f_name VARCHAR(250) NOT NULL,
  l_name VARCHAR(250) NOT NULL,
  -- country VARCHAR(250) NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(200),
  password VARCHAR(250),
  image VARCHAR(1000),
  agreement_doc VARCHAR(1000),
  agreement_name VARCHAR(1000),
  description VARCHAR(1000),
  role VARCHAR(50) DEFAULT "Dev",
  start_date DATE,
  end_date DATE,
  dev_no INT UNIQUE KEY AUTO_INCREMENT
);

CREATE TABLE clients(
  client_id VARCHAR(36) NOT NULL PRIMARY KEY,
  client_no INT UNIQUE KEY AUTO_INCREMENT,
  f_name VARCHAR(250) NOT NULL,
  l_name VARCHAR(250) NOT NULL,
  country VARCHAR(250) NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(200),
  password VARCHAR(250),
  image VARCHAR(1000),
  documents VARCHAR(1000),
  role VARCHAR(15) DEFAULT "Client",
  description VARCHAR(1000),
  start_date DATE,
  end_date DATE
);

CREATE TABLE projects(
  project_id VARCHAR(36) NOT NULL PRIMARY KEY,
  document_id VARCHAR(255),
  doc_type ENUM VARCHAR(255),
  client_id VARCHAR(36),
  title VARCHAR(255),
  logo VARCHAR(255),
  status VARCHAR(36),
  budget INT,
  start_date DATE,
  deadline DATE,
  end_date DATE,
  description VARCHAR(1000)
);

CREATE TABLE documents(
  id VARCHAR(36) NOT NULL,
  url VARCHAR(1000),
  document_name VARCHAR(255),
  user_id VARCHAR(36),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE DeveloperRecord (
    dev_id INT,
    record_id INT,
    status VARCHAR(36),
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (developer_id, record_id) ON DELETE CASCADE,
    FOREIGN KEY (record_id) REFERENCES Records(record_id) ON DELETE CASCADE,
    FOREIGN KEY (dev_id) REFERENCES devs(dev_id) ON DELETE CASCADE
);

