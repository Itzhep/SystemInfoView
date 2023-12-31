import { exec } from 'child_process';
import * as os from 'os';

function printColored(color: string, text: string): void {
    console.log(`\x1b[1;${color}m${text}\x1b[0m`);
}

async function runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || error.message);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

async function systemInformation(): Promise<void> {
    printColored('36', '=== System Information ===');

    const hostInfo = os.hostname();
    const osInfo = os.type();
    const kernelVersion = os.release();

    console.log(`Hostname: ${hostInfo}`);
    console.log(`OS: ${osInfo}`);
    console.log(`Kernel Version: ${kernelVersion}`);
    console.log('-------------------------');
}

async function cpuInformation(): Promise<void> {
    printColored('36', '=== CPU Information ===');

    // Fetch CPU model using a cross-platform command
    const cpuModel = await runCommand('wmic cpu get caption /value');
    console.log(`CPU Model: ${cpuModel.split('=')[1].trim()}`);

    // Fetch the number of CPUs using a cross-platform command
    const numCPUs = await runCommand('wmic cpu get NumberOfCores /value');
    console.log(`Number of CPUs: ${parseInt(numCPUs.split('=')[1], 10)}`);
    console.log('-------------------------');
}

async function ramInformation(): Promise<void> {
    printColored('36', '=== RAM Information ===');

    const totalRAM = await runCommand('wmic memorychip get capacity /value');
    console.log(`Total RAM: ${Math.round(parseInt(totalRAM.split('=')[1], 10) / 1e9)} GB`);

    // Fetch used and free RAM using cross-platform commands
    const freeRAM = await runCommand('systeminfo | find "Available Physical Memory"');
    const usedRAM = await runCommand('systeminfo | find "Total Physical Memory"');

    console.log(`Used RAM: ${Math.round((parseInt(usedRAM.split(':')[1], 10) - parseInt(freeRAM.split(':')[1], 10)) / 1e6)} GB`);
    console.log(`Free RAM: ${Math.round(parseInt(freeRAM.split(':')[1], 10) / 1e6)} GB`);
    console.log('-------------------------');
}

async function diskInformation(): Promise<void> {
    printColored('36', '=== Disk Information ===');

    // Fetch disk information using a cross-platform command
    const diskInfo = await runCommand('wmic diskdrive get size /value');
    const diskSizeGB = Math.round(parseInt(diskInfo.split('=')[1], 10) / 1e9);

    console.log(`C: - Total: ${diskSizeGB} GB`); // Assuming C: is the system drive

    console.log('-------------------------');
}

async function additionalChecks(): Promise<void> {
    printColored('36', '=== Additional Checks ===');

    // Add additional checks here

    console.log('-------------------------');
}

async function main(): Promise<void> {
    await systemInformation();
    await cpuInformation();
    await ramInformation();
    await diskInformation();
    await additionalChecks();

    console.log('System checkup completed.');
}

main().catch((error) => {
    console.error(error);
});
