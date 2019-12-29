/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import * as express from 'express';
import * as ejs from 'ejs';


const app = express();
// Set up static files in 'static' folder
app.use(express.static('dist/static/ts'));
app.use(express.static('static/css'));
// Parse forms
app.use(express.urlencoded({extended: true}));
// So it can be hosted on app engine
app.enable('trust proxy');

// Home Page
app.get('/', (req, res) => {
  ejs.renderFile('templates/index.html', {}, {}, function(err, html_output){
    res
      .status(200)
      .send(html_output)
      .end();
  });
});

// About my family
app.get('/about', (req, res) => {
  ejs.renderFile('templates/about_my_family.html', {}, {}, function(err, html_output){
    res
      .status(200)
      .send(html_output)
      .end();
  });
});

// New blog post
// app.get('/post', async (req, res) => {
//   const email = await iapAuth.getSignedInEmail(req);
//   if (email) {
//     ejs.renderFile('templates/new_post.html', {email}, {}, function(err, html_output){
//       res
//         .status(200)
//         .send(html_output)
//         .end();
//     });
//   } else {
//     res.status(404).send('404 Not Found').end();
//   }
// });

// View all blog posts
// app.post('/post', async (req, res) => {
//   const email = await iapAuth.getSignedInEmail(req);
//   if (email) {
//     const blogPost = {
//       title: req.body.title,
//       email: req.body.email,
//       content: req.body.content,
//     };
//     await blogPostStorage.insertBlogPost(blogPost)
//     const [allBlogPosts] = await blogPostStorage.getAllBlogPosts();
//     const templateData = {allPosts: allBlogPosts};
//     ejs.renderFile('templates/view_all_posts.html', templateData, {}, function(err, htmlOutput){
//       res
//         .status(200)
//         .send(htmlOutput)
//         .end();
//     });
//   } else {
//     res.status(404).send('404 Not Found').end();
//   }
// });

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
