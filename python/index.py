import os
import subprocess
os.system("")  # enables ansi escape characters in terminal

class ver:
    name = "Neptune"
    string = "1.0.0-rc1"
version = ver()

title = "Forecast " + version.string + " " + version.name # other modules may modify it
os.system("title " + title)

class senders:
    core = "forecast"
    modules = "modules"
sources = senders()

class colors:
    error = "91"
    warn = "93"
    info = "94"
    success = "92"
    output = "97"
logging = colors()

def log(message, type, sender=None):
    if not sender:
        print ('\033[' + type + 'm' + message + '\033[0m')
    else:
        print('\033[' + type + 'm' + sender + ": " + message + '\033[0m')

#
log("starting", logging.success, sources.core)

if not os.path.exists("./modules"):
    os.mkdir("modules")
    log("folder not found, creating now", logging.warn, sources.modules)

counter = 0
commands = []
for files in os.listdir('modules'):
    if(files.endswith(".py")):
        counter = counter + 1
        commands.append("python ./modules/" + files)
    else:
        continue
log("loaded " + str(counter) + " modules", logging.success, sources.modules)
log("started on version " + version.string + " " + version.name, logging.success, sources.core)
for j in range(max(int(len(commands)/counter), 1)):
    procs = [subprocess.Popen(i, shell=True) for i in commands[j*counter: min((j+counter)*counter, len(commands))] ]
    for p in procs:
        p.wait()