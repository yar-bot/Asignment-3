const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

const blogPosts = [
  { id: 1, title: 'Заголовок поста 1', content: 'Содержание поста 1' },
  { id: 2, title: 'Заголовок поста 2', content: 'Содержание поста 2' },
];

app.get('/', (req, res) => {
  res.render('home', { blogPosts });
});

app.get('/blog/:id', (req, res) => {
  const postId = req.params.id;
  const blogPost = blogPosts.find(post => post.id === parseInt(postId));
  res.render('blog', { blogPost });
});

app.get('/add-blog', (req, res) => {
  res.render('add-blog');
});

app.post('/add-blog', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
  };
  blogPosts.push(newPost);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
