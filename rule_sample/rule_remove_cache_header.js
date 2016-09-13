//rule scheme : remove the cache header in request and response
const Q = require('q');

module.exports = {
    summary: function () {
        return 'The rule to disable cache';
    },

    replaceRequestOption : function(req,option){
        const d = Q.defer();

        option = Object.assign({}, option);
        delete option.headers['if-none-match'];
        delete option.headers['if-modified-since'];
        d.resolve(option);
        return d.promise;
    },

    replaceResponseHeader: function(req,res,header){
        const d = Q.defer();

        header = Object.assign({}, header);
        header = header || {};
        header["Cache-Control"] = "no-cache, no-store, must-revalidate";
        header["Pragma"] = "no-cache";
        header["Expires"] = 0;

        d.resolve(header);

        return d.promise;
    }
};