import Article from "../models/Article.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const article = await Article.create({
      title,
      content,
      author,
      versionHistory: [{ content, createdAt: new Date() }],
    });

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArticles = async (req, res) => {
  const articles = await Article.find().populate("author");
  res.json(articles);
};
