var CryptoJS = require("crypto-js");
var DES_KEY="8mR4*B$pUyBL^W2a";
//DES 加密
function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding:CryptoJS.pad.Pkcs7
        }
    );
    return encrypted.toString();
}
    //DES 解密
    function decryptByDES(message, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var decrypted = CryptoJS.DES.decrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
export function jiami(text){
       return encryptByDES(text,DES_KEY)
}
export function jiemi(text){
     return decryptByDES(text,DES_KEY)
}