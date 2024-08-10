import { usersModel } from "../models/users.model.js"; 

const getUsers = async (query, options) => { 
    const users = await usersModel.paginate(query, options);
    return users;
};

const getUserById = async (id) => {
	const user = usersModel.findById(id);
    return user;
};

const getUserByEmail = async (email) => {
    const user = usersModel.findOne({email});
    return user;
}
const createUser = async (data) => {
	const user = usersModel.create(data); 
    return user;
};

const updateUserById = async (id, data) => {
	
    const user = await usersModel.findByIdAndUpdate(id, data, {new: true});
    return user;
};


const deleteUserById = async (id) => {
	const user = await usersModel.deleteOne({_id: id}); 
    if(user.deletedCount === 0) return false; 
    return true; 
};

export default {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById
}