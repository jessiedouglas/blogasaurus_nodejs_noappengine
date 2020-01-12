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

import {Request, Response} from "express";
import * as express from 'express';
import * as ejs from 'ejs';
// For typeORM
import "reflect-metadata";
import {createConnection} from "typeorm";
import {BlogPost} from './entity/blogpost';
import {getConnectionOptions} from './ormconfig';


const app = express();
// Set up static files in 'static' folder
app.use(express.static('dist/static/ts'));
app.use(express.static('static/css'));
// Parse forms
app.use(express.urlencoded({extended: true}));
// So it can be hosted on app engine
app.enable('trust proxy');

// Home Page
app.get('/', (req: Request, res: Response) => {
  ejs.renderFile('templates/index.html', {}, {}, function(err, html_output){
    res
      .status(200)
      .send(html_output)
      .end();
  });
});

// About my family
app.get('/about', (req: Request, res: Response) => {
  ejs.renderFile('templates/about_my_family.html', {}, {}, function(err, html_output){
    res
      .status(200)
      .send(html_output)
      .end();
  });
});

// New blog post
app.get('/post', (req: Request, res: Response) => {
  ejs.renderFile('templates/new_post.html', {}, {}, function(err, html_output){
    res
      .status(200)
      .send(html_output)
      .end();
  });
});

// View blog post
app.post('/post', async (req: Request, res: Response) => {
  const newBlogPost = new BlogPost();
  newBlogPost.title = req.body.title;
  newBlogPost.author = req.body.author;
  newBlogPost.content = req.body.content;
  await newBlogPost.save();

  const allBlogPosts = await BlogPost.find();
  ejs.renderFile('templates/view_all_posts.html', {allPosts: allBlogPosts}, {}, function(err, html_output){
    res
      .status(200)
      .send(html_output)
      .end();
  });
});

const env = process.env._ && process.env._.indexOf("heroku") ? 'prod' : 'dev';

// Connect to the database
createConnection(getConnectionOptions(env)).then(() => {
  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}).catch((e) => {
  console.log("TypeORM error: ", e);
});

module.exports = app;
