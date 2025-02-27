export function validateEmail(email: any) {
  const re =
    /^(([^<>()\\,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function validatePhone(phone: any) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
}
function removeAscent(str: any) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}
export function validateFullName(string: any) {
  const re = /^[a-zA-Z ]{2,}$/g;
  return re.test(removeAscent(string));
}

export function urlParseParams(objectParse: any = {}) {
  const str = [];
  for (const p in objectParse)
    if (objectParse.hasOwnProperty(p)) {
      if (objectParse[p]) {
        str.push(
          encodeURIComponent(p) + "=" + encodeURIComponent(objectParse[p])
        );
      }
    }
  return str.join("&");
}

// format date to dd/mm/yyyy hh:mm:ss
export function formatDate(date: any) {
  if (date) {
    return new Date(date).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  return null;
}

export function formatMoney(x: any, decimal = 0) {
  try {
    if (x) {
      const format = parseFloat(x).toFixed(decimal);
      return format.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return x;
    }
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export function formatPhoneNumber(phoneNumberString: any) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "" + match[1] + "." + match[2] + "." + match[3];
  }
  return null;
}

export function convertNumberToWords(num: number): string {
  const units = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
    "mười",
    "mười một",
    "mười hai",
    "mười ba",
    "mười bốn",
    "mười lăm",
    "mười sáu",
    "mười bảy",
    "mười tám",
    "mười chín",
  ];
  const tens = [
    "",
    "",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];

  if (num === 0) return "không";

  if (num < 20) {
    return units[num];
  }

  if (num < 100) {
    return (
      tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "")
    );
  }

  if (num < 1000) {
    return (
      units[Math.floor(num / 100)] +
      " trăm" +
      (num % 100 !== 0 ? " " + convertNumberToWords(num % 100) : "")
    );
  }

  if (num < 1000000) {
    return (
      convertNumberToWords(Math.floor(num / 1000)) +
      " nghìn" +
      (num % 1000 !== 0 ? " " + convertNumberToWords(num % 1000) : "")
    );
  }

  if (num < 1000000000) {
    return (
      convertNumberToWords(Math.floor(num / 1000000)) +
      " triệu" +
      (num % 1000000 !== 0 ? " " + convertNumberToWords(num % 1000000) : "")
    );
  }

  return (
    convertNumberToWords(Math.floor(num / 1000000000)) +
    " tỷ" +
    (num % 1000000000 !== 0 ? " " + convertNumberToWords(num % 1000000000) : "")
  );
}

export function slugify(string: any) {
  if (typeof string === "string") {
    const a =
      "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
    const b =
      "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");
    return string
      .toString()
      .toLowerCase()
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
      .replace(/đ/gi, "d")
      .replace(/\s+/g, "-")
      .replace(p, (c) => b.charAt(a.indexOf(c)))
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
  return string;
}

export function getUrlDevLinkV3(type: any) {
  let URL_GET_FROM_ENV: any = "";
  if (type === "api_gw") {
    URL_GET_FROM_ENV = process.env.NEXT_PUBLIC_API_URL;
  }
  return URL_GET_FROM_ENV;
}

export function isJsonString(str: any) {
  try {
    return JSON.parse(str);
  } catch (e) {
    logger.error(e);
    return [];
  }
}

export function isJsonObject(str: any) {
  try {
    return JSON.parse(str);
  } catch (e) {
    logger.error(e);
    return {};
  }
}

export const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const toBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => resolve(reader.result));
    reader.onerror = (error) => reject(error);
  });
};

export const base64ToBlob = (base64: any, type: any) => {
  const base64Slice = base64.split(",")[1];
  const binStr = window.atob(base64Slice.replaceAll(/\s/g, ""));
  const len = binStr.length;
  const buffer = new ArrayBuffer(len);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    // eslint-disable-next-line
    arr[i] = binStr.charCodeAt(i);
  }
  const blob = new Blob([arr], { type });
  return URL.createObjectURL(blob);
};

export const fileToLink = async (file: any) => {
  let url = null;
  if (file) {
    const base64 = await toBase64(file);
    url = base64ToBlob(base64, file?.file?.type);
  }

  return url;
};

export const fileToBlob = (file: any) => {
  if (file) {
    return URL.createObjectURL(file);
  }
  return null;
};

// a little function to help us with reordering the result
export const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const isValidateFile = (
  file: any,
  acceptFile = ["jpg", "jpeg", "png"]
) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split(".");

  return (
    (file.type?.includes("image") || file.type === "") &&
    acceptFile.includes(`.${name[name?.length - 1]}`?.toLowerCase())
  );
};

export const checkMb = (file: any, maxSize = 5) => {
  const checkMb = file.size / 1024 / 1024 < maxSize;
  return checkMb;
};

export const listCSVType = ["csv"];
export const listImageType = ["png", "jpg", "jpeg"];
export const typeCSV = ".csv";
export const typeImage = ".png,.jpg,.jpeg";

export const isCSV = (file: any) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split(".");

  return name && [listCSVType].includes(name[name?.length - 1]?.toLowerCase());
};

export const isImage = (file: any) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split(".");

  return (
    name && [listImageType].includes(name[name?.length - 1]?.toLowerCase())
  );
};

const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image: any,
  canvas: any,
  crop: any,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const logger = {
  error: (...messages: any[]) => {
    if (!isProduction) console.error(...messages);
  },
  info: (...messages: any[]) => {
    if (!isProduction) console.info(...messages);
  },
  log: (...messages: any[]) => {
    if (!isProduction) console.log(...messages);
  },
  warn: (...messages: any[]) => {
    if (!isProduction) console.warn(...messages);
  },
};
