
const multer = require('multer');

const storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOADS || './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

const upload = multer({
    storage: storage,
  }).single('file')
  // upload

module.exports = {

  upload: (req, res, next) => {
    upload(req,res,err => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
    });
  }
  // upload

}
