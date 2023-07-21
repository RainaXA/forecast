# Forecast
Forecast is a basic lightweight framework written in Node.js, intended to make Node.js application development easier. 
Forecast includes a module loader, colored logging system, and a console command system.

## Requirements
Node.js v4.9.1 or later is required to run Forecast 1.2.0. Windows XP is the earliest Windows version to run Forecast without any modifications.
**It's important to note that some Forecast modules may not work on older versions of Node.js.** 

## Where to Begin
It's simple! 
1. Download `index.js`.
2. Run it using `node index.js` to allow it to create a modules folder - or create `./modules/` in the same folder as `index.js` manually.
3. Create a `*.js` file within `./modules.`.
4. Program in the file! (you can even create multiple for modular programs!)

## Documentation
This section shall be dedicated to documenting the functions of Forecast, as of 1.2.0.

### Logging
`log()` provided by Forecast should always be used rather than `console.log()`! `log()` provides color easily, and is integrated deeper into Forecast. 

As an example, Forecast allows the user to change the colors provided by default - meaning `log()` works better with the user!

In order to do a basic white log, all that is required is `log("this is a log!")`, which will output the text in white. 

A color code provided under `global.logging` or an ANSI color escape code can suffice as the second argument should you want to add color:

`logging.error` - bright red

`logging.warn` - bright yellow

`logging.info` - bright blue

`logging.success` - bright green

`logging.output` - bright white

For example, `log("this is an info log!", logging.info)` will output "this is an info log!" in blue text. As an ANSI escape code can work too, `log("this is purple", 95)` will output "this is purple" in purple text.

A sender may also be included as the final argument, which will include the source of the message. It is preferrable to include your source under `global.sources`, although any string will suffice.
For example, `log("core info message!", logging.info, sources.core)` will send "forecast: core info message!" in blue text.

### Console command system
Simply put, it's `readline` as a global variable! Across all modules, you can add an event listener using `rl.on` as `rl` is a global variable, allowing consistency throughout all modules.

### Settings
Starting from 1.1.0, Forecast now allows for client-sided settings, in order to improve the user experience.

To get started, you just have to create a new file in the Forecast folder named `settings.json`.

Inside of `settings.json`, there are four key settings you can do:

1. `doNotLogStartup`. Setting this to 0 will not do anything, setting it to 1 will only show module information, and setting it to 2 will not show anything.
2. `noColor`. Setting this to `true` will set all color to white. If there is a color override of white, it will be set to that color instead.
3. `overrides`. This is an object, and each value in the object should contain an ANSI color code, or any element from `logging`.
4. `hideCompatibility`. This is a boolean - setting it to `true` will hide all compatibilty concerns from Forecast relating to modules using `info`. 

Here's an example of a full `settings.json`:
```js
{
	"doNotLogStartup": 2,
	"noColor": true,
	"overrides": {
		"error": 92,
		"97": 91
	},
	"hideCompatibility": true
}
```

### Array manipulation
Forecast includes a few functions to help with manipulation with arrays.

==

`forecast.arrays.delDup()` is a function that deletes all duplicate items in an array.

For example, `forecast.arrays.delDup([2, 2, 3, 4, 5, 5, 6])` will return `[2, 3, 4, 5, 6]`.


`forecast.arrays.getText()` is a function that checks a string to see if it contains any item in an array.

The full context on usage is `forecast.arrays.getText(string, array, type)` - `string` is the string that should be compared, and `array` is the array that will be scrolled through. `type` is an argument that will determine if the function will check only inclusion (using the value `0`), or exact comparison (using the value `1`).


`forecast.arrays.shuffle()` is a function that shuffles an arrays contents.

For example, `forecast.arrays.shuffle([3, 4, 5])` may return `[4, 3, 5]`, or any other assortment.


### String checking
`forecast.isStr(string)` is a simple function that returns `true` or `false` to check if a variable is a string.

### Requiring files
`forecast.require(file, callback)` is a function that can serve as a replacement for the default Node.js `require` function in many cases.

This function handles any errors with requiring files by default, rather than crashing the program. An optional callback is also allowed, which will execute the code inside of there instead of Forecast providing a warning on the file.

This is a valid example of a way of using `forecast.require()`:
```js
forecast.require('./file.js', function() {
	log("testing!", logging.info, sources.core)	
})
```
