import jwt from 'jsonwebtoken';
import { envConfig } from '../config';

exports.generateAccessToken = async (name: object) => {
	// expires after 5 mins (300 seconds = 5 minutes)
	const token = jwt.sign({ name }, envConfig.JWT_SECRET, { expiresIn: '1h' });
	return token.toString();
};

exports.checkToken = async (
	token: string,
): Promise<string | jwt.JwtPayload> => {
	try {
		const decodedToken = jwt.verify(token, envConfig.JWT_SECRET);
		return decodedToken;
	} catch (err) {
		return err.message;
	}
};

exports.isTokenExpired = async (token: string): Promise<boolean> => {
	const decodedToken: jwt.JwtPayload | string = jwt.decode(token);
	const dateToken = new Date((decodedToken as jwt.JwtPayload).exp * 1000);
	const dateNow = new Date();
	if (dateToken < dateNow) {
		return true;
	}
	return false;
};
