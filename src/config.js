import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { encrypt } from "unixcrypt";

export default async function getConfig() {
	console.log('\nAnswer the following questions to generate the debian preseed:\n');

	const rl = createInterface({ input, output });

	const values = {
		template: {
			username: await rl.question('Username: '),
			user_fullname: await rl.question('Full name: '),
			user_password: encrypt(await rl.question(`User password: `), '$6$rounds=200000'),
			ssh_public_key: await rl.question('SSH public key: '),
		},
		image: {
			path: await rl.question('Absolute path of Debian ISO image (required to add preseed URL): ')
		}
	};

	rl.close();

	return values;
}
