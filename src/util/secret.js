import aes from "crypto-js/aes";

/**
 * 加密
 */

export const Encrypt = word => {
  const SECRET_KEY = "www.JiangSuYUHE.cn.";

  var encrypted = aes.encrypt(word, SECRET_KEY);
  return encrypted.toString();
};
/**
 * 解密
 */
// export const Decrypt = word => {
//   var key = CryptoJS.enc.Utf8.parse("www.JiangSuYUHE.cn.");
//   var decrypt = CryptoJS.AES.decrypt(word, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// };
