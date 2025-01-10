var G_ARRAY = []
var IP = "http://194.164.125.5:6020"

export function SET_GLOBAL(name, value) {
    G_ARRAY[name] = value
}

export function GET_GLOBAL(name) {
    var ELEMENT = G_ARRAY[name];
    return ELEMENT ?? null
}

export function GetIp() {
    return IP
}
