"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatas = getDatas;

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function getDatas(uri) {
  var URL = "http://localhost:3000/api/";

  if (uri) {
    URL += (_readOnlyError("URL"), uri);
  }

  fetch(URL).then(function (response) {
    return response.json();
  }) //recuperation du resultat
  .then(function (data) {
    return data;
  }) //en cas d'erreur
  ["catch"](function (err) {
    return err;
  });
}
//# sourceMappingURL=utils.dev.js.map
