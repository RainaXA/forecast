# Forecast
Forecast is a basic lightweight framework written in Node.js, intended to make Node.js application development easier. 
Forecast includes a module loader, colored logging system, and a console command system.

## Requirements
Node.js is required to run Forecast 1.0.0. It is unknown which Node.js version is the earliest that is able to run it - testing will occur soon.
Forecast has no other dependencies.

## Where to Begin
It's simple! 
1. Download `index.js`.
2. Run it using `node index.js` to allow it to create a modules folder - or create `./modules/` in the same folder as `index.js` manually.
3. Create a `*.js` file within `./modules.`.
4. Program in the file! (you can even create multiple for modular programs!)

## Documentation
This section shall be dedicated to documenting the functions of Forecast, as of 1.0.0.

# Logging
`log()` provided by Forecast should always be used rather than `console.log()`!
`log()` provides color easily, and is integrated deeper into Forecast. 
As an example, `1.1.0` will include options of changing the colors provided by default - meaning `log()` will work better with the user!

In order to do a basic white log, all that is required is `log("this is a log!")`, which will output the text in white. 
A color code provided under `global.logging` or an ANSI color escape code can suffice as the second argument should you want to add color:
`logging.error` - bright red
`logging.warn` - bright yellow
`logging.info` - bright blue
`logging.success` - bright green
`logging.output` - bright white
For example, `log("this is an info log!", logging.info)` will output "this is an info log!" in blue text.
As an ANSI escape code can work too, `log("this is purple", 95)` will output "this is purple" in purple text.

A sender may also be included as the final argument, which will include the source of the message. It is preferrable to include your source under `global.sources`, although any string will suffice.
For example, `log("core info message!", logging.info, sources.core)` will send "forecast: core info message!" in blue text.

# Console command system
Simply put, it's `readline` as a global variable! Across all modules, you can add an event listener using `rl.on` as `rl` is a global variable, allowing consistency throughout all modules.
