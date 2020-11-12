const express = require('express');
const app = express();

const articles = new Map();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('foi!')
})

app.post('/articles', (req, res) => {
    const { body } = req;

    const allowed = ['title', 'content', 'author', 'tags'];

    const keys = Object.keys(body)

    for (const key of keys) {      
        if (!allowed.includes(key)) {
            return res.status(400).json({
                error: 'Invalid payload'
            })
        }
    }

    if (allowed.length !== keys.length) {
        return res.status(400).json({
            error: 'Invalid payload'
        })
    }

    const article = {
      ...req.body,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }

    articles.set(article.id, article)

    return res.status(201).json(article)
})

module.exports = app;