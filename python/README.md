# Forecast
Forecast is a basic lightweight framework written in Python, intended to make Python application development easier. 
Forecast (Py) includes a module loader and colored logging system.

## Requirements
Python compatibility is currently unknown.

## Where to Begin
It's simple! 
1. Download `index.py`.
2. Run it using `python forecast.py` to allow it to create a modules folder - or create `./modules/` in the same folder as `index.py` manually.
3. Create a `*.py` file within `./modules.`.
4. Program in the file! (you can even create multiple for modular programs!)

## Documentation
This section shall be dedicated to documenting the functions of Forecast, as of 1.0.0.

### Logging
`forecast.log()` provided by Forecast should always be used rather than `print()`! `forecast.log()` provides color easily, and is integrated deeper into Forecast. 

A color code provided under `forecast.logging` or an ANSI color escape code can suffice as the second argument should you want to add color:

`forecast.logging.error` - bright red

`forecast.logging.warn` - bright yellow

`forecast.logging.info` - bright blue

`forecast.logging.success` - bright green

`forecast.logging.output` - bright white

A sender may also be included as the final argument, which will include the source of the message. It is preferrable to include your source under `forecast.sources`, although any string will suffice.
For example, `forecast.log("core info message!", forecast.logging.info, forecast.sources.core)` will send "forecast: core info message!" in blue text.

### Importing Forecast
Simply paste this at the top of your file:
```
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import forecast
```
