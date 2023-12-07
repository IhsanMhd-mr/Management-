import jwtActions from "jsonwebtoken";

export const CreateToken = async (id, email, status) => {
  try {
    const accessToken = await jwtActions.sign(
      { id: id, email: email, role: status },
      "JWT_SECRET",
      { expiresIn: "30d" }
    );
    return accessToken;
  } catch (error) {
    throw error;
  }
};

export const ValidateSuperAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res
      .status(401)
      .json({ status: false, message: "Super admin access required" });
    return;
  }

  const accessToken = authToken.replace("Bearer ", "");

  jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }

    if (decoded.role !== "super admin") {
      res.status(403).json({ status: false, message: "Access denied!" });
      return;
    }

    next();
  });
};

export const ValidateClient = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res
      .status(401)
      .json({ status: false, message: "Client access required" });
    return;
  }

  const accessToken = authToken.replace("Bearer ", "");

  jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }

    if (decoded.role !== "client") {
      res.status(403).json({ status: false, message: "Access denied!" });
      return;
    }

    next();
  });
};


export const ValidateAdmin = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
      res
        .status(401)
        .json({ status: false, message: "Super admin or admin access required" });
      return;
    }
  
    const accessToken = authToken.replace("Bearer ", "");
  
    jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
      if (error) {
        res.status(401).json({ status: false, message: error.message });
        return;
      }
  
      if (decoded.role !== "super admin" && decoded.role !== "admin") {
        res.status(403).json({ status: false, message: "Access denied!" });
        return;
      }
  
      next();
    });
  };

  export const decodeJWT = async (req, res) => {
    const authtoken = req.headers.authorization;
    const token = authtoken?.replace('Bearer ', '') || req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }
  
    const verifyPromise = () => {
      return new Promise((resolve, reject) => {
        jwtActions.verify(token, "JWT_SECRET", (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded);
          }
        });
      });
    };
  
    try {
      const decoded = await verifyPromise();
      return {decoded:decoded,status:true};
    } catch (err) {
      return { message: 'Invalid token',status:false };
    }
  };

  export const validateRequest = async (req, res, next) => {
    const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).json({ status: false, message: "Token not valid" });
    return;
  }

  const accessToken = authToken.replace("Bearer ", "");

  jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }
    next();
  });
  };

  export const ValidateSuperAdminAndClient = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
      res
        .status(401)
        .json({ status: false, message: "Client or super admin access required" });
      return;
    }
  
    const accessToken = authToken.replace("Bearer ", "");
  
    jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
      if (error) {
        res.status(401).json({ status: false, message: error.message });
        return;
      }
  
      if (decoded.role !== "client" && decoded.role !== "super admin") {
        res.status(403).json({ status: false, message: "Access denied!" });
        return;
      }
  
      next();
    });
  };


