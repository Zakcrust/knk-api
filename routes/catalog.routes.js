const controller = require("../controllers/catalog.controller");
// @ts-ignore
const Router = require("express").Router;
var multer = require("multer");
// @ts-ignore
const storage = multer.memoryStorage({
  // @ts-ignore
  destination: function (req, file, cb) {
    cb(null, "foto-peserta");
  },
});
const upload = multer({ storage: storage });
const auth = require('../middlewares/auth');
module.exports = function (app) {
    // @ts-ignore
    app.use(function (error, req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        res.status(error.status || 500).json({
            status: false,
            error : {
                // @ts-ignore
                message : error.message || serverErrorMsg
            }
        })
        next();
    });

    // @ts-ignore
    app.post("/api/catalog/", [auth.verifyToken, upload.single('catalog_picture')], controller.create);

    // @ts-ignore
    app.get("/api/catalog/", [auth.verifyToken], controller.get);

    // @ts-ignore
    app.put("/api/catalog/update/:id", [auth.verifyToken], controller.update)

    // @ts-ignore
    app.delete("/api/catalog/delete/:id", [auth.verifyToken], controller.delete)

};
