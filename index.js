'use strict' // node.js v4 compatibility
const fs = require('fs');
const readline = require('readline');
global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

global.version = {
  name: "Neptune",
  string: "1.0.1"
}

process.stdout.write('\x1Bc'); // node.js v4 compatibility
process.title = "Forecast " + version.string + " " + version.name;

global.sources = {
  core: "forecast",
  modules: "modules"
}

global.logging = {
  error: 91,
  warn: 93,
  info: 94,
  success: 92,
  output: 97
}

global.log = function(message, type, sender) {
  if(!type) type = 97;
  if(!sender) {
    console.log("\x1b[" + type + "m" + message + "\x1b[0m");
  } else {
    console.log("\x1b[" + type + "m" + sender + ": " + message + "\x1b[0m");
  }
}
log("starting", logging.success, sources.core);

fs.readdir("./modules/", function(error, files) {
  if (error) {
    fs.mkdirSync("./modules/");
    log("folder not found, creating now", logging.warn, sources.modules);
  } else {
    let modules = files.filter(f => f.split(".").pop() === "js");
    let counter = 0;
    modules.forEach((f, i) => {
      try {
        let props = require(`./modules/${f}`);
      } catch (err) {
        log(err.stack, logging.error, sources.modules);
        counter++;
      }
    })
    log("loaded " + (modules.length - counter) + " modules", logging.success, sources.modules);
  }
  log("started on version " + version.string + " " + version.name, logging.success, sources.core);
})
