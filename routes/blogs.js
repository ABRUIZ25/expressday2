var express = require('express');
var router = express.Router();
let blogs = require('../public/Blogs')


router.get('/allblogs', function (req, res, next) {
    let blogPosts = blogs.blogPosts
    const BlogsDate = []


    let sort = req.query.sort


    for (let i = 0; i < blogPosts.length; i++) {
        BlogsDate.push(Date.parse(blogPosts[i].createdAt))

    }


    if (sort === 'asc') {



        const ascBlogDate = BlogsDate.sort(function (a, b) { return a - b })


        res.json(ascBlogDate)
        console.log('if desc statement', 'asc')
        console.log(ascBlogDate)

    } else if (sort === 'desc') {
        const descBlogDate = BlogsDate.sort(function (a, b) { return b - a })


        res.json(descBlogDate)
        console.log('if desc statement', 'desc')
        console.log(descBlogDate)
    }

});


router.get('/blogsbyid/:blogid', function (req, res, next) {
    let AllBlogs = blogs.blogPosts
    // console.log('blogpost', BlogPost)

    const blogid = parseInt(req.params.blogid)

    const foundBlogId = AllBlogs[blogid];

    res.json(foundBlogId.text)



});






module.exports = router;