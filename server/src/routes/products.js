import { Router } from 'express';
import { prisma } from '../db.js';

export const productsRouter = Router();

// GET /api/products  — optional ?category=Interior filter
productsRouter.get('/', async (req, res) => {
  const { category } = req.query;
  const products = await prisma.product.findMany({
    where: category ? { category: String(category) } : undefined,
    orderBy: { id: 'asc' }
  });
  res.json(products);
});

// GET /api/products/:id
productsRouter.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json(product);
});
