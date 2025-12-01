import { Router } from 'express';
import Article from '../models/Article.js';


const articlesRouter = Router();


// Create
articlesRouter.post('/', async (req, res) => {
try {
const article = await Article.create(req.body);
res.json(article);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// Read all
articlesRouter.get('/', async (req, res) => {
const articles = await Article.find().sort({ createdAt: -1 });
res.json(articles);
});

articlesRouter.get('/debug/count', async (req, res) => {
  const count = await Article.countDocuments();
  res.json({ count });
});


// Read one
articlesRouter.get('/:id', async (req, res) => {
const article = await Article.findById(req.params.id);
res.json(article);
});


// Update
articlesRouter.put('/:id', async (req, res) => {
const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
});


// Delete
articlesRouter.delete('/:id', async (req, res) => {
await Article.findByIdAndDelete(req.params.id);
res.json({ success: true });
});


export default articlesRouter;