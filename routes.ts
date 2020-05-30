import { Router, send } from 'https://deno.land/x/oak/mod.ts'
import { getaccount, getAccountbyId, createNote, getSingleNote, updateNote, deleteNote } from './controllers/product.controller.ts'

const router = new Router()
router.get("/", async (context) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/`,
        index: "index.html",
    });
});
router
    .get('/accounts', getaccount)
    .get("/accounts/:accountid", getAccountbyId)
    .get('/accounts/:id', getSingleNote)
    .post('/accounts', createNote)
    .put('/accounts/:id', updateNote)
    .delete('/accounts/:id', deleteNote)
    ;

export default router