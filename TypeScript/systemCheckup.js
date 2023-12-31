"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var os = require("os");
function printColored(color, text) {
    console.log("\u001B[1;".concat(color, "m").concat(text, "\u001B[0m"));
}
function runCommand(command) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    (0, child_process_1.exec)(command, function (error, stdout, stderr) {
                        if (error) {
                            reject(stderr || error.message);
                        }
                        else {
                            resolve(stdout.trim());
                        }
                    });
                })];
        });
    });
}
function systemInformation() {
    return __awaiter(this, void 0, void 0, function () {
        var hostInfo, osInfo, kernelVersion;
        return __generator(this, function (_a) {
            printColored('36', '=== System Information ===');
            hostInfo = os.hostname();
            osInfo = os.type();
            kernelVersion = os.release();
            console.log("Hostname: ".concat(hostInfo));
            console.log("OS: ".concat(osInfo));
            console.log("Kernel Version: ".concat(kernelVersion));
            console.log('-------------------------');
            return [2 /*return*/];
        });
    });
}
function cpuInformation() {
    return __awaiter(this, void 0, void 0, function () {
        var cpuModel, numCPUs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    printColored('36', '=== CPU Information ===');
                    return [4 /*yield*/, runCommand('wmic cpu get caption /value')];
                case 1:
                    cpuModel = _a.sent();
                    console.log("CPU Model: ".concat(cpuModel.split('=')[1].trim()));
                    return [4 /*yield*/, runCommand('wmic cpu get NumberOfCores /value')];
                case 2:
                    numCPUs = _a.sent();
                    console.log("Number of CPUs: ".concat(parseInt(numCPUs.split('=')[1], 10)));
                    console.log('-------------------------');
                    return [2 /*return*/];
            }
        });
    });
}
function ramInformation() {
    return __awaiter(this, void 0, void 0, function () {
        var totalRAM, freeRAM, usedRAM;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    printColored('36', '=== RAM Information ===');
                    return [4 /*yield*/, runCommand('wmic memorychip get capacity /value')];
                case 1:
                    totalRAM = _a.sent();
                    console.log("Total RAM: ".concat(Math.round(parseInt(totalRAM.split('=')[1], 10) / 1e9), " GB"));
                    return [4 /*yield*/, runCommand('systeminfo | find "Available Physical Memory"')];
                case 2:
                    freeRAM = _a.sent();
                    return [4 /*yield*/, runCommand('systeminfo | find "Total Physical Memory"')];
                case 3:
                    usedRAM = _a.sent();
                    console.log("Used RAM: ".concat(Math.round((parseInt(usedRAM.split(':')[1], 10) - parseInt(freeRAM.split(':')[1], 10)) / 1e6), " GB"));
                    console.log("Free RAM: ".concat(Math.round(parseInt(freeRAM.split(':')[1], 10) / 1e6), " GB"));
                    console.log('-------------------------');
                    return [2 /*return*/];
            }
        });
    });
}
function diskInformation() {
    return __awaiter(this, void 0, void 0, function () {
        var diskInfo, diskSizeGB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    printColored('36', '=== Disk Information ===');
                    return [4 /*yield*/, runCommand('wmic diskdrive get size /value')];
                case 1:
                    diskInfo = _a.sent();
                    diskSizeGB = Math.round(parseInt(diskInfo.split('=')[1], 10) / 1e9);
                    console.log("C: - Total: ".concat(diskSizeGB, " GB")); // Assuming C: is the system drive
                    console.log('-------------------------');
                    return [2 /*return*/];
            }
        });
    });
}
function additionalChecks() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            printColored('36', '=== Additional Checks ===');
            // Add additional checks here
            console.log('-------------------------');
            return [2 /*return*/];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, systemInformation()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cpuInformation()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, ramInformation()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, diskInformation()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, additionalChecks()];
                case 5:
                    _a.sent();
                    console.log('System checkup completed.');
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error(error);
});
