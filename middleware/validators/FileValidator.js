const { error } = require("../../utils/errorMessages.ts");


/**
 * This checks the validity to upload file
 */
module.exports.checkValidityToUploadFile = async (files) => {
    if (!files || !files.file) {
        return (error.NO_FILE_UPLOADED)
    }
    return true;

};

/**
 * This checks the validity to get one file
 */
module.exports.checkValidityToGetOneFile = async (name) => {
    if (!name) {
        return (error.NAME_IS_EMPTY)
    }
    return true;

};


/**
 * This checks the validity to delete file
 */
module.exports.checkValidityDeleteFile = async (name) => {
    if (!name) {
        return (error.NAME_IS_EMPTY)
    }
    return true;

};

