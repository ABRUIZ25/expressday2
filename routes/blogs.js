const { text } = require('express');
var express = require('express');
var router = express.Router();
let blogs = require('../public/Blogs')
const blogList = blogs.blogPosts
console.log('old list of blogs', blogList)




router.get('/all', function (req, res, next) {


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
    else { res.json(blogList) }



});


router.get('/singleblog/:blogid', function (req, res, next) {
    let AllBlogs = blogs.blogPosts


    const blogid = parseInt(req.params.blogid)

    const foundBlogId = AllBlogs[blogid];

    res.json(foundBlogId.text)



});


router.get('/postblog', function (req, res, next) {

    let data = req.body

    let NewBlogs = data
    console.log(NewBlogs)
    res.render('postBlog')



});

router.post('/submit', function (req, res, next) {

    const data = req.body
    // console.log(data.title)
    const today = new Date()
    // console.log(today)


    const newPost = {
        title: data.title,
        text: data.text,
        author: data.author,
        createdAt: today,
        id: String(blogList.length + 1)
    }
    console.log(newPost)
    blogList.push(newPost)

    console.log('new list of blogs', blogList)
    res.send('ok')
});

router.get('/displayBlogs', function (req, res, next) {
    res.render('displayBlogs')



})

router.get('/displaySingleBlog', function (req, res, next) {
    res.render('displaySingleBlog')
})

router.delete('/deleteSingleBlog/:blogid', function (req, res, next) {
    let AllBlogs = blogs.blogPosts


    const blogid = parseInt(req.params.blogid)

    const foundBlogId = AllBlogs[blogid];

    res.send('ok')
})







module.exports = router;