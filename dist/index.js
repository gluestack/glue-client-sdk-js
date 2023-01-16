"use strict";
exports.__esModule = true;
exports.Glue = void 0;
var auth_1 = require("./auth");
var storage_1 = require("./storage");
var Glue = (function () {
    function Glue(_a) {
        var AUTH_BASE_URL = _a.AUTH_BASE_URL;
        this.auth = new auth_1.Auth(AUTH_BASE_URL);
        this.storage = new storage_1.Storage();
    }
    return Glue;
}());
exports.Glue = Glue;
//# sourceMappingURL=index.js.map