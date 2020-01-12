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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ejs = require("ejs");
// For typeORM
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const blogpost_1 = require("./entity/blogpost");
const ormconfig_1 = require("./ormconfig");
const app = express();
// Set up static files in 'static' folder
app.use(express.static('dist/static/ts'));
app.use(express.static('static/css'));
// Parse forms
app.use(express.urlencoded({ extended: true }));
// So it can be hosted on app engine
app.enable('trust proxy');
// Home Page
app.get('/', (req, res) => {
    ejs.renderFile('templates/index.html', {}, {}, function (err, html_output) {
        res
            .status(200)
            .send(html_output)
            .end();
    });
});
// About my family
app.get('/about', (req, res) => {
    ejs.renderFile('templates/about_my_family.html', {}, {}, function (err, html_output) {
        res
            .status(200)
            .send(html_output)
            .end();
    });
});
// New blog post
app.get('/post', (req, res) => {
    ejs.renderFile('templates/new_post.html', {}, {}, function (err, html_output) {
        res
            .status(200)
            .send(html_output)
            .end();
    });
});
// View blog post
app.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlogPost = new blogpost_1.BlogPost();
    newBlogPost.title = req.body.title;
    newBlogPost.author = req.body.author;
    newBlogPost.content = req.body.content;
    yield newBlogPost.save();
    const allBlogPosts = yield blogpost_1.BlogPost.find();
    ejs.renderFile('templates/view_all_posts.html', { allPosts: allBlogPosts }, {}, function (err, html_output) {
        res
            .status(200)
            .send(html_output)
            .end();
    });
}));
const env = process.env._ && process.env._.indexOf("heroku") ? 'prod' : 'dev';
// Connect to the database
typeorm_1.createConnection(ormconfig_1.getConnectionOptions(env)).then(() => {
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
//# sourceMappingURL=app.js.map