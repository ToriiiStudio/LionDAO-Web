export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const zeroTransfer = (num) => {
  let str = num + "";
  if (str.length === 1) {
    str = '000' + str
  }
  else if (str.length === 2) {
    str = '00' + str
  }
  else if (str.length === 3) {
    str = '0' + str
  }

  return str
}

export function detectMob() {
  let check = false;
  if (window.innerWidth < 760) check = true;
  return check;
}

export function applyThousandPoint(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const lockWindow = (status) => {
  if (status) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style = {};
  }
}


export const handleHistoryPush = (slug) => {
  window.history.pushState({}, '', slug);
}


const hexToRgb = (hex) => {
  // http://stackoverflow.com/a/5624139
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

export const rgba = (hex, alpha) => {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

