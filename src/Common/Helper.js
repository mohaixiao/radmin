/**
 * @param {String} str 查询字符串
 * @return {Object}
 */

export function urlParamsToObject(str) {
    // str : ?str=233
    if (!str) {
        return null
    }
    str = str.slice(1);
    let pareArr = str.split('&');
    let result = {};
    pareArr.forEach(item => {
        let keyAndValue = item.split('=');
        result[keyAndValue[0]] = keyAndValue[1];
    })
    return result;
}


/**
 * @param {String} str 查询字符串
 * @return {Object}
 */

export function formateDateToString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}


