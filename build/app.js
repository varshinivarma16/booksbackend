"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middleware/error");
const user_route_1 = __importDefault(require("./routes/user.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const layout_route_1 = __importDefault(require("./routes/layout.route"));
const express_rate_limit_1 = require("express-rate-limit");
const coupon_router_1 = require("./routes/coupon.router");
const maintenance_route_1 = require("./routes/maintenance.route");
const certificatePdf_router_1 = __importDefault(require("./routes/certificatePdf.router"));
const quiz_route_1 = __importDefault(require("./routes/quiz.route"));
const progress_router_1 = __importDefault(require("./routes/progress.router"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const crypto_1 = __importDefault(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
require('dotenv').config();
const apiLogger = require('./controllers/apiLogger');
// body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
const bodyParser = require('body-parser');
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// cors => cross origin resource sharing
exports.app.use((0, cors_1.default)({
    // make sure you don't have / in last 
    // Do "http://localhost:3000"
    // Don't "http://localhost:3000/"
    origin: ["http://localhost:3000"],
    credentials: true,
}));
// api requests limit
// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000,
// 	max: 100, 
// 	standardHeaders: 'draft-7', 
// 	legacyHeaders: false, 
// })
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60000, // 1 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    handler: function (req, res, next) {
        setTimeout(() => {
            next();
        }, 5000); // 5-second delay for requests over the limit
    }
});
// middleware calls
exports.app.use(limiter);
exports.app.use(apiLogger);
// routes
exports.app.use("/api/v1", user_route_1.default, order_route_1.default, course_route_1.default, notification_route_1.default, analytics_route_1.default, layout_route_1.default, coupon_router_1.couponRouter, maintenance_route_1.maintenanceRouter, certificatePdf_router_1.default, quiz_route_1.default, progress_router_1.default, task_route_1.default);
// testing api
exports.app.get("/test", async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "GET API is working",
    });
});
exports.app.post("/order", async (req, res, next) => {
    try {
        const instance = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY + "",
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto_1.default.randomBytes(10).toString("hex")
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Something Went Wrong!",
                    error: error
                });
            }
            res.status(200).json({ data: order });
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            err
        });
    }
});
exports.app.post("/verify", async (req, res, next) => {
    try {
        const { razorPay_order_id, razorPay_payment_id, razorPay_signature } = req.body;
        const sign = razorPay_order_id + "|" + razorPay_payment_id;
        // @ts-ignore
        const expectedSign = crypto_1.default.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");
        if (razorPay_signature === expectedSign) {
            return res.status(200).json({ success: true, message: "Payment Verify Successfully!" });
        }
        else {
            return res.status(400).json({ success: false, message: "Invalid Signature !" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong!",
            error
        });
    }
});
// unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
exports.app.use(error_1.ErrorMiddleware);
