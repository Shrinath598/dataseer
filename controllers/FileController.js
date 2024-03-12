const fs = require('fs');
const path = require('path');
const { checkValidityToUploadFile, checkValidityToGetOneFile, checkValidityDeleteFile
} = require("../middleware/validators/FileValidator");
const { error } = require("../utils/errorMessages.ts");
const { success } = require("../utils/successMessages.ts");


/**
 * Upload file
 */
exports.upload = async (req, res) => {
    const response = await checkValidityToUploadFile(req.files);
    if (response.code) {
        return res.send(response)
    }
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }, (err) => {
            if (err) {
                res.send(error.ERROR_CREATING_DIRECTORY)
            }
        });
    }
    const uploadedFile = req.files.file;
    fs.rename(uploadedFile.path, path.join(uploadDir, uploadedFile.name), (err) => {
        if (err) {
            return res.send(error.FILE_UPLOAD_FAILED)
        }
        res.send({...success.FILE_UPLOADED_SUCCESSFULLY , fileName : uploadedFile.name})
    });

};


/**
 * Get all files
 */
exports.getAll = async (req, res) => {

    const uploadDir = path.join(__dirname, '../public/uploads');
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.send(error.FILE_NOT_FOUND)
        }

        files = files.filter(file => fs.statSync(path.join(uploadDir, file)).isFile());

        res.send({ ...success.FILES_FETCH_SUCCESSFUL, totalFiles: files.length, list: files })
    });
}


/**
 * Get one file
 */
exports.getOne = async (req, res) => {

    const { name } = req.body;
    const response = await checkValidityToGetOneFile(name);
    if (response.code) {
        return res.send(response)
    }
    const uploadDir = path.join(__dirname, '../public/uploads');
    const filePath = path.join(uploadDir, name);
    if (!fs.existsSync(filePath)) {
        return res.send(error.FILE_NOT_FOUND)
    }
    res.send({ ...success.FILE_FOUND, filePath: filePath })
}


/**
 * Display image in response
 */
exports.displayImage = async (req, res) => {

    const { name } = req.body;
    const response = await checkValidityToGetOneFile(name);
    if (response.code) {
        return res.send(response)
    }
    const uploadDir = path.join(__dirname, '../public/uploads');
    const filePath = path.join(uploadDir, name);
    if (!fs.existsSync(filePath)) {
        return res.send(error.FILE_NOT_FOUND)
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.setHeader('Content-Type', 'image/png');
        res.send(data)
    });
}


/**
 * Delete file
 */
exports.delete = async (req, res) => {

    const { name } = req.body;
    const response = await checkValidityDeleteFile(name);
    if (response.code) {
        return res.send(response)
    }
    const uploadDir = path.join(__dirname, '../public/uploads');
    const filePath = path.join(uploadDir, name);
    if (!fs.existsSync(filePath)) {
        return res.send(error.FILE_NOT_FOUND)
    }
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.send(error.FILE_NOT_DELETED)
        }
        res.send(success.FILE_DELETED_SUCCESSFULLY)
    });
}

