const express = require('express');
const router = express.Router();
const postModel = require('../models/Post');

/* 
[listing posts] 
localhost:3000/api/v1/posts/
*/
router.get("", async (req, res, next) => {
    try {
        const user = req.query.user;
        const cats = req.query.category;
        let posts;
        if (user) {
            posts = await postModel.find({ user });
        }
        else if (cats) {
            posts = await postModel.find({
                categories: {
                    $in: [cats]
                }
            });

        } else {
            posts = await postModel.find({});
        }
        return res.status(200).json({ status: true, data: { posts } });
    } catch (error) {
        console.log(error)
    }
});


/* 
[adding new post] 
localhost:3000/api/v1/posts/create
*/
router.post("/create", async (req, res, next) => {
    try {
        const posts = await postModel.create(req.body);
        res.status(200).json({ status: true, data: { message: "post created" } });
    } catch (error) {
        console.log(error)
    }
});


/* 
[update post] 
localhost:3000/api/v1/posts/update/:Id
*/
router.put("/update/:postId", async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.postId);

        // if (post.user == req.body.userId) {

        const update = await postModel.findByIdAndUpdate(req.params.postId, req.body, {
            new: true
        });
        res.status(200).json({ status: true, data: { message: 'post updated' } });

        // } else {
        //     res.status(404).json({ status: false, data: { message: 'You can update only your Post' } })
        // }
    } catch (error) {
        console.log(error)
    }
});

/* 
[singe post] 
localhost:3000/api/v1/posts/:Id
*/
router.get("/:postId", async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.postId).populate("user", "email username");

        res.status(200).json({ status: true, data: { message: { post } } });


    } catch (error) {
        console.log(error)
    }

});


/* 
[delete post] 
localhost:3000/api/v1/posts/delete/:Id
*/
router.delete("/delete/:id", async (req, res, next) => {

    try {
        const post = await postModel.findOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ status: false, data: { message: 'post did  not found' } });
        }
        await postModel.findByIdAndRemove(req.params.id)
        return res.status(200).json({ status: true, data: { message: "Post deleted" } });


    } catch (error) {
        console.log(error)
    }
});





module.exports = router;