import { Router } from "express";

// ==================================================================================

import { Controller } from "@/core/boilerplate";
import * as Services from "@/services/test.service"; // change this...

const app = Router();

// ==================================================================================

//-> Login

app.post(`/api/service-name/test/v1/login-only-username`, async (req, res) => {
    /**
          #swagger.tags = ['Test']

          #swagger.responses[200] = { schema: {
            token: "string",
            message: "string",
          }, description: "Get Token" }
          #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
          #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
      */
    const { username } = req.body;

    return Controller(res, await Services.loginByUsername(res, username));
});

//-> RabbitMQ

app.post(`/api/service-name/test/v1/rabbit-send`, async (req, res) => {
    /**
        #swagger.tags = ['Test']

        #swagger.responses[200] = { schema: { "$ref": "#/definitions/only_message" }, description: "Success Send" }
        #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
        #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
    */
    const { message } = req.body;

    return Controller(res, await Services.rabbitSend(message));
});

//-> Redis

app.post(`/api/service-name/test/v1/redis-send`, async (req, res) => {
    /**
      #swagger.tags = ['Test']

      #swagger.responses[200] = { schema: { "$ref": "#/definitions/only_message" }, description: "Success Send" }
      #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
      #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
  */
    const { message } = req.body;

    return Controller(res, await Services.redisSend(message));
});

app.get(`/api/service-name/test/v1/redis-get/:key`, async (req, res) => {
    /**
      #swagger.tags = ['Test']

      #swagger.responses[200] = { schema: {
        message: "test",
      }, description: "Get Value" }
      #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
      #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
  */
    const { key } = req.params;

    return Controller(res, await Services.redisGet(key));
});

app.delete(`/api/service-name/test/v1/redis-delete/:key`, async (req, res) => {
    /**
      #swagger.tags = ['Test']

      #swagger.responses[200] = { schema: { "$ref": "#/definitions/only_message" }, description: "Success Delete" }
      #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
      #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
  */
    const { key } = req.params;

    return Controller(res, await Services.redisDelete(key));
});

// ==================================================================================

export default app;
