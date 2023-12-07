import * as UserRepository from './Repositories/UserRepository.js'

const generateSuperAdminUser = async () => {
  const superAdmin = await UserRepository.GetSuperAdmin();

  if(superAdmin.length > 0){
    console.log("Super admin already created");
  }else{

    const result = await UserRepository.RegisterSuperAdmin();
    const addColoumn = await UserRepository.insertShowColoumn();
    if(result && addColoumn){
      console.log("Super admin user created successfully");
    }else{
      console.error("Failed to create Super admin");
      return;
    }
  }

};

generateSuperAdminUser();
