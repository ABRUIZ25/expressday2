const { text } = require('express');
var express = require('express');
var router = express.Router();
let blogs = require('../public/Blogs')
const blogList = blogs.blogPosts
console.log('old list of blogs', blogList)


const { blogsDB } = require('../mongo')

router.get('/all', async function (req, res, next) {
    const collection = await blogsDB().collection('posts')
    res.json(collection)

});


router.get('/singleblog/:blogid', async function (req, res, next) {
    const collection = await blogsDB().collection('posts')

    let AllBlogs = collection


    const blogid = parseInt(req.params.blogid)

    const foundBlogId = AllBlogs[blogid];

    res.json(foundBlogId)



});


router.get('/postblog', async function (req, res, next) {
    const collection = await blogsDB().collection('posts')

});

router.post('/submit', async function (req, res, next) {


    const data = req.body
    console.log(data.title)
    const today = new Date()
    // console.log(today)

    await makePost(data.title, data.text, data.author, data.category, data.createdAt)

    res.send('ok')
});

let getPostsCollectionLength = async () => {
    const collection = await blogsDB().collection('posts')
    let ammountOfPosts = await collection.find({}).toArray().length + 1

    return ammountOfPosts
}

let makePost = async (title, text, author, category) => {

    const today = new Date()

    const collection = await blogsDB().collection('posts')

    let creatPost = await collection.insertOne(
        {
            createdAt: today,
            lastModified: today,
            title: title,
            text: text,
            author: author,
            category: category,
            id: await getPostsCollectionLength()
        })
    return creatPost
}

router.get('/displayBlogs', function (req, res, next) {
    res.render('displayBlogs')



})

router.get('/displaySingleBlog', function (req, res, next) {
    res.render('displaySingleBlog')
})

router.delete('/deleteSingleBlog/:blogid', async function (req, res, next) {
    const collection = await blogsDB().collection('posts')

    let AllBlogs = collection


    const blogid = parseInt(req.params.blogid)

    const foundBlogId = AllBlogs[blogid];

    let deletePost = await collection.deleteone(foundBlogId)

    res.send('ok', deletePost)
})







module.exports = router;