'use strict' // node.js v4 compatibility
const fs = require('fs');
const readline = require('readline');
global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

global.version = {
  name: "Ceres",
  string: "1.1.0"
}

try {
  var settings = require('./settings.json') // retain forwards compatibility easily - will be global variable in 1.2.0
  if(!settings.overrides) settings.overrides = {}
  // doNotLogStartup: 0 = log it fully, 1 = only display how many modules loaded, 2 = display none
} catch(err) {
  var settings = {
    overrides: {} // overrides is an object 
  }; // if this line doesn't exist then things that want to look for settings are undefined which therefore crashes forecast
}

process.stdout.write('\x1Bc'); // node.js v4 compatibility
process.title = `Forecast ${version.string} ${version.name}`;

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

for(const override in settings.overrides) {
	if(isNaN(override)) settings.overrides[logging[override]] = settings.overrides[override] // set the number of a logging type as an override directly to be interpreted by log()
}

global.log = function(message, type, sender) {
  if(!type || settings.noColor) type = 97;
  if(settings.overrides[type]) type = settings.overrides[type]; // it is intended functionality that you can change the color if it is in noColor mode
  let resetColor = 0;
  if(settings.overrides['97'] && settings.noColor) resetColor = settings.overrides['97']
  if(!sender) {
	console.log(`\x1b[${type}m${message}\x1b[${resetColor}m`);
  } else {
	console.log(`\x1b[${type}m${sender}: ${message}\x1b[${resetColor}m`);
  }
}

if(settings.doNotLogStartup != 1 && settings.doNotLogStartup != 2) log("starting", logging.success, sources.core); // this is the only way i can get this bullshit to work currently and i am impatient
if(!fs.existsSync("./settings.json")) log("settings.json does not exist. you can create it to change some basic functionality of forecast!", logging.info, sources.core)

fs.readdir("./modules/", function(error, files) {
  if (error) {
    fs.mkdirSync("./modules/");
    if(settings.doNotLogStartup != 2) log("folder not found, creating now", logging.warn, sources.modules);
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
    if(settings.doNotLogStartup != 2)  log(`loaded ${(modules.length - counter)} modules`, logging.success, sources.modules);
  }
  log("started on version " + version.string + " " + version.name, logging.success, sources.core);
})
