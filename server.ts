import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'
import { NOT_FOUND ,ERROR_HANDLER} from './utils/middlewares.ts'


const port = 8000

const app = new Application()


app.use(ERROR_HANDLER);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(NOT_FOUND);

console.log(`Server running on port ${port}`)

await app.listen({ port })