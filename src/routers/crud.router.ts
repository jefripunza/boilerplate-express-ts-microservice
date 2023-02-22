import { Router } from "express";

// ==================================================================================

import { Controller } from "@/core/boilerplate";
import * as Services from "@/services/crud.service"; // change this...
import { IPaginationRequest } from "@/contracts/pagination.contract";

import token_validation from "@/middlewares/token_validation";

const app = Router();

// ==================================================================================

//-> Create

app.post(`/api/service-name/crud/v1/add`, async (req, res) => {
    /**
        #swagger.tags = ['Microservice']

        #swagger.responses[200] = { schema: { "$ref": "#/definitions/only_message" }, description: "Success Insert" }
        #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
        #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
    */
    const { name, username, password } = req.body;

    return Controller(res, await Services.add(name, username, password)); // change this...
});

//-> Read / Validation

app.get(
    `/api/service-name/crud/v1/pagination`,
    token_validation,
    async (req, res) => {
        /**
            #swagger.tags = ['Microservice']

            #swagger.responses[200] = { schema: { "$ref": "#/definitions/pagination" }, description: "List Data with Pagination" }
            #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
            #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
        */
        const { page, perPage, sort, order, search }: IPaginationRequest =
            req.query;

        return Controller(
            res,
            await Services.pagination({ page, perPage, sort, order, search }),
        );
    },
);

app.get(
    `/api/service-name/crud/v1/detail/:id`,
    token_validation,
    async (req, res) => {
        /**
            #swagger.tags = ['Microservice']

            #swagger.responses[200] = { schema: {
                name: "string",
                username: "string",
            }, description: "Detail Data" }
            #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
            #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
        */
        const { id } = req.params;

        return Controller(res, await Services.detail(id)); // change this...
    },
);

//-> Update

app.put(
    `/api/service-name/crud/v1/edit/:id`,
    token_validation,
    async (req, res) => {
        /**
            #swagger.tags = ['Microservice']

            #swagger.responses[200] = { schema: { "$ref": "#/definitions/only_message" }, description: "Success Update" }
            #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
            #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
        */
        const { id } = req.params;
        const { name, username } = req.body;

        return Controller(res, await Services.edit(id, name, username)); // change this...
    },
);

//-> Delete

app.delete(
    `/api/service-name/crud/v1/remove/:id`,
    token_validation,
    async (req, res) => {
        /**
            #swagger.tags = ['Microservice']

            #swagger.responses[200] = { schema: { "$ref": "#/definitions/only_message" }, description: "Success Delete" }
            #swagger.responses[400] = { schema: { "$ref": "#/definitions/only_message" }, description: "Client Error" }
            #swagger.responses[500] = { schema: { "$ref": "#/definitions/only_message" }, description: "Internal Server Error" }
        */
        const { id } = req.params;

        return Controller(res, await Services.remove(id)); // change this...
    },
);

// ==================================================================================

export default app;
