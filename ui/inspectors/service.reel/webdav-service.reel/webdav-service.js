var Component = require("mod/ui/component").Component;
/**
 * @class WebdavService
 * @extends Component
 */
exports.WebdavService = Component.specialize({

    //document for web-dav sharing:
    //http://doc.freenas.org/9.10/freenas_services.html#webdav
    //


    PROTOCOL_OPTIONS: {
        value: [
            "HTTP",
            "HTTPS"
        ]
    },



    //HTTP Authentication List
    AUTHENTICATIONS: {
        value: [
            "BASIC",
            "DIGEST"
        ]
    }
});
