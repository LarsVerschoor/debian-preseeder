import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile } from "fs";

export async function readGrubConfigFromImage(path) {
	const execFileAsync = promisify(execFile);

	await execFileAsync("xorriso", [
		"-osirrox", "on",
		"-indev", path,
		"-extract", "/boot/grub/grub.cfg", "build/grub.cfg",
	]);

	return await readFile("build/grub.cfg", "utf8");
}

export async function addPreseedUrlToImage(path, modifiedGrubConfig) {

}
