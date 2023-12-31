import { exec } from 'child_process';

function printColored(color: number, text: string) {
    console.log(`\x1b[1;${color}m${text}\x1b[0m`);
}

function runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(`Error running command '${command}': ${error.message}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

async function systemInformation() {
    printColored(36, 'System Information');

    const cpuUsage = await runCommand("top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | cut -d'%' -f1%");
    printColored(33, `CPU Usage: ${cpuUsage}%`);

    const memoryUsage = await runCommand("free -m | awk '/Mem/ {printf \"%.2f%%\", $3/$2 * 100}'");
    printColored(33, `Memory Usage: ${memoryUsage}`);

    const diskUsage = await runCommand("df -h / | awk 'NR==2 {print $5}'");
    printColored(33, `Disk Usage: ${diskUsage}`);

    const networkSent = await runCommand("cat /proc/net/dev | awk '/eth0/ {print $10}'");
    printColored(33, `Network Sent: ${networkSent} bytes`);

    const networkReceived = await runCommand("cat /proc/net/dev | awk '/eth0/ {print $2}'");
    printColored(33, `Network Received: ${networkReceived} bytes`);
}

async function additionalOptions() {
    printColored(36, '\nAdditional Options');

    const cpuFreq = await runCommand("lscpu | awk '/MHz/ {printf \"%.2f\", $3/1000}'");
    printColored(32, `1. CPU Frequency: ${cpuFreq} GHz`);

    try {
        const batteryInfo = await runCommand("acpi -b | awk -F'[,:%]' '{print $2, $3}'");
        printColored(32, `2. Battery: ${batteryInfo}`);
    } catch (error) {
        printColored(31, '2. Battery Information not available');
    }
}

async function topProcesses() {
    printColored(36, '3. Top CPU-consuming Processes');

    const topCpuProcesses = await runCommand("ps aux --sort=-%cpu | awk 'NR<=6 {print \"\\x1b[1;31m   \" $11 \" (PID: \" $2 \"): \" $3 \"% CPU\"}'");
    console.log(topCpuProcesses);
}

async function topMemoryProcesses() {
    printColored(36, '4. Top Memory-consuming Processes');

    const topMemoryProcesses = await runCommand("ps aux --sort=-%mem | awk 'NR<=6 {print \"\\x1b[1;31m   \" $11 \" (PID: \" $2 \"): \" $4 \"% Memory\"}'");
    console.log(topMemoryProcesses);
}

async function cpuUptime() {
    const uptimeMinutes = await runCommand("awk '{print int($1/60)}' /proc/uptime");
    printColored(35, `5. CPU Uptime: ${uptimeMinutes} minutes`);
}

async function extendedOptions() {
    printColored(36, '\nExtended Options');

    const cpuTimes = await runCommand("grep 'cpu MHz' /proc/cpuinfo | awk '{print \"\\x1b[1;32m   Core \" NR-1 \": \" $4 \" GHz\"}'");
    console.log(cpuTimes);

    printColored(32, '7. Disk Partitions');
    const diskPartitions = await runCommand("df -h | awk 'NR>1 {print \"\\x1b[1;32m   \" $1 \" - \" $6}'");
    console.log(diskPartitions);
}

async function main() {
    await systemInformation();
    await additionalOptions();
    await topProcesses();
    await topMemoryProcesses();
    await cpuUptime();
    await extendedOptions();
}

main();
