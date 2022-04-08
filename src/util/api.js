// 密码验证规则
function validatePasswd(rule, value) {
  var pwdRegex = new RegExp(
    "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$"
  );
  console.log(value, "value");
  if (value) {
    if (!pwdRegex.test(value)) {
      return Promise.reject(
        "请输入8-16个字符,字符中必须包含字母、数字、特殊字符."
      );
    }
  }
  return Promise.resolve();
}
// 账户验证规则
function validateAccount(rule, value) {
  var pwdRegex = new RegExp("[A-Za-z][-a-zA-Z0-9_]{1,30}$");
  console.log(value, "value");
  if (value) {
    if (!pwdRegex.test(value)) {
      return Promise.reject(
        "限30个字符，字母开头，支持大小写英文字母数字及下划线."
      );
    }
  }
  return Promise.resolve();
}

// 手机验证规则
function validateTelphone(rule, value) {
  var phoneRegex = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  console.log(value, "value11");

  if (value) {
    if (!phoneRegex.test(value)) {
      return Promise.reject("请输入手机号!");
    }
  }

  return Promise.resolve();
}

// 时间规则
function getHMS(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";

  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

function getHMS2(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  // var Y = date.getFullYear() + "-";
  // var M =
  //   (date.getMonth() + 1 < 10
  //     ? "0" + (date.getMonth() + 1)
  //     : date.getMonth() + 1) + "-";
  // var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";

  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return h + m + s;
}

// 初始化容量大小
function initSize(size) {
  const sizeInt = parseInt(size);
  if (!sizeInt) {
    return <div>max: 0KB</div>;
  } else if (sizeInt > 0 && sizeInt < 1024) {
    return (
      <div>
        <span>max:</span> {sizeInt}KB
      </div>
    );
  } else if (sizeInt >= 1024 && sizeInt < 1048576) {
    return (
      <div>
        <span>max:</span> {(sizeInt / 1024).toFixed(2)}
        MB
      </div>
    );
  } else if (sizeInt >= 1048576 && sizeInt < 1073741824) {
    return (
      <div>
        <span>max:</span> {(sizeInt / 1048576).toFixed(2)}
        GB
      </div>
    );
  } else {
    return (
      <div>
        <span>max:</span> {(sizeInt / 1073741824).toFixed(2)}
        TB
      </div>
    );
  }
}
// 初始化容量大小
function initSizeMin(size) {
  const sizeInt = parseInt(size);
  if (!sizeInt) {
    return <div>min: 0KB</div>;
  } else if (sizeInt > 0 && sizeInt < 1024) {
    return (
      <div>
        <span>min:</span> {sizeInt}KB
      </div>
    );
  } else if (sizeInt >= 1024 && sizeInt < 1048576) {
    return (
      <div>
        <span>min:</span> {(sizeInt / 1024).toFixed(2)}
        MB
      </div>
    );
  } else if (sizeInt >= 1048576 && sizeInt < 1073741824) {
    return (
      <div>
        <span>min:</span> {(sizeInt / 1048576).toFixed(2)}
        GB
      </div>
    );
  } else {
    return (
      <div>
        <span>min:</span> {(sizeInt / 1073741824).toFixed(2)}
        TB
      </div>
    );
  }
}
function initUnitSize(size) {
  const sizeInt = parseInt(size);
  var sizeList = new Object();
  if (sizeInt >= 0 && sizeInt < 1024) {
    sizeList.size = sizeInt;
    sizeList.unit = "KB";
    return sizeList;
  } else if (sizeInt >= 1024 && sizeInt < 1048576) {
    sizeList.size = (sizeInt / 1024).toFixed(2);
    sizeList.unit = "MB";
    return sizeList;
  } else if (sizeInt >= 1048576 && sizeInt < 1073741824) {
    sizeList.size = (sizeInt / 1048576).toFixed(2);
    sizeList.unit = "GB";
    return sizeList;
  } else {
    sizeList.size = (sizeInt / 1073741824).toFixed(2);
    sizeList.unit = "TB";
    return sizeList;
  }
}

function initUnitSize2(size,num) {
  const sizeInt = size;
  var sizeList = new Object();
  if (num===0) {
    sizeList.size = sizeInt;
    sizeList.unit = "KB";
    return sizeList;
  } else if (num===1) {
    sizeList.size = (sizeInt / 1024).toFixed(2);
    sizeList.unit = "MB";
    return sizeList;
  } else if (num===2) {
    sizeList.size = (sizeInt / 1048576).toFixed(2);
    sizeList.unit = "GB";
    return sizeList;
  } else {
    sizeList.size = (sizeInt / 1073741824).toFixed(2);
    sizeList.unit = "TB";
    return sizeList;
  }
}

function changeSize_Unit(size, unit) {
  const sizeInt = parseInt(size);
  if (unit === "KB") {
    return size;
  } else if (unit === "MB") {
    return size * 1024;
  } else if (unit === "GB") {
    return size * 1048576;
  } else if (unit === "TB") {
    return size * 1073741824;
  }
  // var sizeList = new Object();
  // if (sizeInt > 0 && sizeInt < 1024) {
  //   sizeList.size = sizeInt;
  //   sizeList.unit = "KB";
  //   return sizeList;
  // } else if (sizeInt >= 1024 && sizeInt < 1048576) {
  //   sizeList.size = (sizeInt / 1024).toFixed(2);
  //   sizeList.unit = "MB";
  //   return sizeList;
  // } else if (sizeInt >= 1048576 && sizeInt < 1073741824) {
  //   sizeList.size = (sizeInt / 1048576).toFixed(2);
  //   sizeList.unit = "GB";
  //   return sizeList;
  // } else {
  //   sizeList.size = (sizeInt / 1073741824).toFixed(2);
  //   sizeList.unit = "TB";
  //   return sizeList;
  // }
}
//  获取cookies
function getCookie(name) {
  var cookies = document.cookie;
  var array = cookies.split(";");
  for (var i = 0; i < array.length; i++) {
    var item = array[i].split("=");
    if (item[0] === name) {
      return item[1];
    }
  }
  return null;
}
function formatSeconds(value) {
  var theTime = parseInt(value); // 秒
  var middle = 0; // 分
  var hour = 0; // 小时
  var result;
  if (theTime <= 60) {
    result = "1分";
  }
  if (theTime > 60) {
    middle = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (middle > 60) {
      hour = parseInt(middle / 60);
      middle = parseInt(middle % 60);
    }
  }
  if (middle > 0) {
    result = "" + parseInt(middle) + "分";
  }
  if (hour > 0) {
    result = "" + parseInt(hour) + "小时";
  }
  return result;
}
function timeLocale() {
  var myDate = new Date();
  return myDate.toLocaleString();
}
export {
  validatePasswd,
  validateTelphone,
  getHMS,
  validateAccount,
  getCookie,
  initSize,
  initSizeMin,
  initUnitSize,
  initUnitSize2,
  changeSize_Unit,
  getHMS2,
  formatSeconds,
  timeLocale
};
