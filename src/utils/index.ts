import { envConfig } from '../config';
import Crypto from '../lib/crypto';

function getEncryptedText<T>(input: T): T {
	const APPLY_ENCRYPTION = envConfig.APPLY_ENCRYPTION === 'true';
	const { SECRET_KEY } = envConfig;

	// Encrypt only if encryption is enabled and secret key is provided
	if (APPLY_ENCRYPTION && SECRET_KEY) {
		// Convert input to JSON string if it's not already a string
		const output =
			typeof input === 'string' ? input : JSON.stringify(input);
		return Crypto.encrypt(output, SECRET_KEY) as T; // Add type assertion
	}

	return input;
}
// need to remove once we have added more functions here
export default getEncryptedText;

export { getEncryptedText };
