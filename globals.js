var G_ARRAY = []
var IP = ""

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
