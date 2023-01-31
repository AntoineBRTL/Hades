# Hades
Simple reverse shell CLI developed for education purposes.

This program is written in Typescript and is made to run with [Node.js](https://nodejs.org/). Some libraries are required, [see](#libs) the list of libraries used in this project.

<!-- Note that this program is compilable using , and the last version is compiled in the `./bin` directory. -->

## Compile from source
1) To compile the program you will firstly need to transpile the all source code to javascript, this can be done using typescript-compiler.

    Download [Typescript](https://github.com/microsoft/TypeScript) and run the following command into the root directory.
    ```bash 
    tsc
    ```

2) Once the program is transpiled, you can proceed to compile it. There are several different tools to compile, but I recommend the use of [Nexe](https://github.com/nexe/nexe).

    Download [Nexe](https://github.com/nexe/nexe) and run the following command into the root directory.
    ```bash 
    nexe src/main.js -o bin/hades -t "linux-x64-14.15.3" -r "src/**.js"
    ```
    Change `linux-x64` with the os you are using following by the architecture of CPU.

## How to use


## Libs
Here is the list of used libraries
- `Axios` - Used to send requests.
- `WSS` - Used for socket connections.
- `Express` - Used to setup servers.

<!-- ## Disclaimer ##
This repository is for academic purposes, the use of this software is your responsibility. -->