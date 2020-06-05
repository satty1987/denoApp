import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'
import { NOT_FOUND ,ERROR_HANDLER} from './utils/middlewares.ts';
import { organ } from "https://raw.githubusercontent.com/denjucks/organ/master/mod.ts";
import * as flags from "https://deno.land/std/flags/mod.ts";

const { args, exit } = Deno;
const DEFAULT_PORT = 8000;
const argPort = flags.parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
    console.log("port is not number");
    exit(1);
}
console.log("port number " + port);

const app = new Application()
app.use(organ("short", true));


app.use(ERROR_HANDLER);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(NOT_FOUND);

console.log(`Server running on port = ${port}`)

await app.listen({ port })