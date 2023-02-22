// 1st
import fs from "fs";
import path from "path";
import http from "http";

// 3th
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import swaggerUi from "swagger-ui-express";
import SwaggerAutoGen from "@/swagger-gen";

import { Server, Path, File, Env } from "@/config";
import { Text } from "@/helpers/random";

export const app: Express = express();
export const server = http.createServer(app);

// ------------------------------------------------------------------------
//-> middlewares

// identitas user request
app.use(cookieParser());
const key_identity = "identity";
app.use(function (req, res, next) {
    // check if client sent cookie
    if (req.cookies[key_identity] === undefined) {
        // set a new cookie
        res.cookie(key_identity, Text(18), {
            maxAge: 900000,
            httpOnly: true,
        });
    }
    next(); // <-- important!
});

// for security
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use((req, res: Response, next) => {
    res.set(
        "Content-Security-Policy",
        "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'",
    );
    return next();
});

// formatting request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logging
if (Env.isDev) app.use(morgan("dev"));

// Public File
app.use(express.static(Path.server.public_path));

// ------------------------------------------------------------------------
//-> Collect

Promise.resolve()
    .then(async () => {
        // Documentation
        if (Env.isLocal || Env.isDev) {
            await SwaggerAutoGen();
            const swagger: any = await import(File.swagger.json);
            app.use(
                "/api/whatsapp/swagger",
                swaggerUi.serve,
                swaggerUi.setup(swagger.default),
            );
        }
    })
    .then(async () => {
        //-> Automatic Listing Routers
        await fs.readdirSync(Path.server.routers).forEach(async (router) => {
            const route: any = await import(
                path.join(Path.server.routers, router)
            );
            app.use(route.default);
        });
    })
    .then(() => {
        // 404 : Page Not Found !!!
        app.all("*", (req: Request, res: Response) => {
            if (
                !["get", "post", "patch", "delete"].includes(
                    String(req.method).toLowerCase(),
                )
            ) {
                return res.status(403).send("forbidden");
            }
            return res.status(404).json({
                message: "endpoint not found!",
            });
        });
    })
    .then(async () => {
        //-> Automatic Listing Tasks / Schedulers
        if (!fs.existsSync(Path.server.tasks)) return;
        await fs
            .readdirSync(Path.server.tasks)
            .filter((task_filename) => !String(task_filename).startsWith("#"))
            .forEach(async (task_filename) => {
                const task_name = String(task_filename)
                    .split(".")[0]
                    .split("-")
                    .map((v) => String(v)[0].toUpperCase() + String(v).slice(1))
                    .join(" ");
                const task: any = await import(
                    path.join(Path.server.tasks, task_filename)
                );
                const [cronExpression, RunTask] = task.default;
                cron.schedule(cronExpression, RunTask);
                console.log(`✅ Task : ${task_name} is Ready!`);
            });
    });

export const StartServer = (is_server_run: any = false) =>
    server.listen(Server.port, () => {
        console.log(`✅ Server listening on ${Server.port}`);
        if (is_server_run) {
            is_server_run();
        }
    });
