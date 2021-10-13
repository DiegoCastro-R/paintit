/**
 * Generate Keys for using as secret for the app, whitout use third part generators
 * Add as many chances as needed
 * Run the script generateAppKeys in package.json to see the output
 */

import crypto from "crypto";

const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");

console.table({ Key1: key1, Key2: key2 });
