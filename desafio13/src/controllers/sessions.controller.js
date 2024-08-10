import { userResponseDto } from "../dto/user-response.dto.js";
import { createToken } from "../utils/jwt.js";

const userRegister = async (req, res, next) => {
	try {


		res.status(201).json({ status: "success", msg: "Usuario registrado"});
	} catch (error) {
		logger.error(error);
		next(error); 
	}
};

const userLoginJWT = async (req, res, next) => {
	try {

		const user = req.user;
		const token = createToken(user)

		res.cookie("token", token, { httpOnly: true}); 
		const userDto = userResponseDto(user);
		return res.status(200).json({ status: "success", payload: userDto, token });
		
	} catch (error) {
        logger.error(error);
		next(error); 
	}
};

const userLoginGoogle = async (req, res, next) => {
	try {
		return res.status(200).json({ status: "success", payload: req.user });
		
	} catch (error) {
        logger.error(error);
		next(error); 
	}
};

const userCurrent = (req, res, next) => {
	try {
		const user = userResponseDto(req.user)
		return res.status(200).json({ status: "success", payload: user });

	} catch (error) {
		logger.error(error);
		next(error); 
		
	}
};

const userLogout = async (req, res, next) => {
    try {
        req.session.destroy(); 
        
        res.status(200).json({ status: "success", response: "Sesión cerrada con éxito" });
        
        
    } catch (error) {
        logger.error(error);
		next(error); 
        
    }
}

export default {
    userRegister,
    userLoginJWT,
    userLoginGoogle,
    userCurrent,
    userLogout
}