import { Server, Env } from "@/config";

export default {
    info: {
        version: "1.0.0",
        title: "Boilerplate - MicroService",
        description: "text here...",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            name: "Jefri Herdi Triyanto",
            email: "jefriherditriyanto@gmail.com",
        },
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
        },
    },
    host: Env.isLocal ? `localhost:${Server.port}` : Server.host_url,
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description:
                "Enter your bearer token in the format **Bearer &lt;token>**",
        },
    },
    definitions: {
        pagination: {
            data: [],
            page: 1,
            perPage: 10,
            total: 0,
            totalPage: 0,
        },
        only_message: {
            message: "string",
        },
    },
    // components: {}, // by default: empty object (OpenAPI 3.x)
};
