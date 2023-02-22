import fs from "fs";
import path from "path";
import swaggerAutogen from "swagger-autogen";

import { Path, File, Env } from "./config";
import doc from "./swagger";

const SwaggerAutoGen = async () => {
    const endpointsFiles = fs
        .readdirSync(Path.server.routers)
        .filter((filename) => !String(filename).startsWith("index."))
        .map((filename) => path.join(Path.server.routers, filename));
    await swaggerAutogen(File.swagger.json, endpointsFiles, doc);
};

if (Env.isCiCd) {
    SwaggerAutoGen();
}

export default SwaggerAutoGen;
