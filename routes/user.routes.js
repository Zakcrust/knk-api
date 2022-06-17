const controller = require("../controllers/user.controller");
// @ts-ignore
var multer = require("multer");
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
    app.post("/api/user/", [], controller.create);

    // @ts-ignore
    app.get("/api/user/", [], controller.get);

    app.post("/api/user/login", [], controller.login);

    // @ts-ignore
    app.put("/api/user/update/:id", [], controller.update)

    // @ts-ignore
    app.delete("/api/user/delete/:id", [], controller.delete)
    
};
