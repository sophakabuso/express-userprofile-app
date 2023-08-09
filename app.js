const express = require('express');
const path = require('path');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Added to handle form data

// Serve static files with explicit MIME type for videos
app.use(express.static('public', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

app.use('/auth', authRouter);
app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.status(404).render('404', { title: '404' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
