
import { Dimensions } from "react-native"
const PRIMARY_COLOR = "#DA291C";
const DARK_COLOR = "#121212";
const FACEBOOK = {
    TOKEN: "https://graph.facebook.com/me?access_token",
    API: "https://graph.facebook.com/v3.3"
}

const URL_SERVICE = "https://serverquecomerios.herokuapp.com";
// const URL_SERVICE = "http://localhost";

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const Encode = (input) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error("'encoded' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }

        block = block << 8 | charCode;
    }

    return output;
}

const Truncate = (str, length, ending) => {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};

const deleteExtraSpaces = (string) => {
    return string.replace(/\s+/g, ' ').trim()
}


export {
    PRIMARY_COLOR,
    DARK_COLOR,
    FACEBOOK,
    Encode,
    Truncate,
    URL_SERVICE,
    deleteExtraSpaces,
    dimensions,
    imageWidth,
    imageHeight
}