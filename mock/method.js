export default function getQueryString(url,name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r =url.substr(1).match(reg);
  if (r != null){
      return decodeURI(r[2]);
  }
  return "";
}
