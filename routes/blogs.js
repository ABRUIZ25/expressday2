var express = require('express');
var router = express.Router();
let blogs = require('../public/Blogs')


router.get('/allblogs', function (req, res, next) {
    let blogPosts = blogs.blogPosts


    res.json(blogPosts)

});


router.get('/blogsbyid/:blogid', function (req, res, next) {
    let AllBlogs = blogs.blogPosts
    // console.log('blogpost', BlogPost)

    const blogid = parseInt(req.params.blogid)
    console.log(typeof blogid)
    const foundBlogId = AllBlogs[blogid];

    console.log('number for the blog', blogid)
    console.log('found blog', foundBlogId)




    res.json(foundBlogId.text)



});






module.exports = router;