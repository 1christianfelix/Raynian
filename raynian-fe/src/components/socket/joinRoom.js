"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoom = void 0;
var socketConnection_1 = require("./socketConnection");
var joinRoom = function (data) {
    console.log("joinRoom");
    console.log(data);
    socketConnection_1.socket.emit("join-room", data);
};
exports.joinRoom = joinRoom;
