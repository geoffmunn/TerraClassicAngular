(window as any).global = window;
// //(window as any).global.Buffer = require('buffer').Buffer;
// //(window as any).process = {};

global.Buffer = global.Buffer || require('buffer').Buffer;