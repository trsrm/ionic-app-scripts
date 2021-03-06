"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger/logger");
var inject_scripts_1 = require("./core/inject-scripts");
var source_maps_1 = require("./util/source-maps");
function postprocess(context) {
    var logger = new logger_1.Logger("postprocess");
    return postprocessWorker(context).then(function () {
        logger.finish();
    })
        .catch(function (err) {
        throw logger.fail(err);
    });
}
exports.postprocess = postprocess;
function postprocessWorker(context) {
    return Promise.all([
        source_maps_1.purgeSourceMapsIfNeeded(context),
        // removeUnusedFonts(context),
        inject_scripts_1.updateIndexHtml(context)
    ]);
}
