import { Knex, Env } from "./src/config";
export default Env.isUnitTest ? Knex.test : Knex.config;
