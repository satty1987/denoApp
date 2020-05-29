import { Router ,send} from 'https://deno.land/x/oak/mod.ts'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controllers/product.controller.ts'

const router = new Router()
router.get("/", async (context) => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/`,
      index: "index.html",
    });
  });
router.get('/api/v1/products', getProducts)
    .get('/api/v1/products/:id', getProduct)
    .post('/api/v1/products', addProduct)
    .put('/api/v1/products/:id', updateProduct)
    .delete('/api/v1/products/:id', deleteProduct)

export default router