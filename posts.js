
const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async (req,res)=>{
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

router.get("/", async (req,res)=>{
  const posts = await Post.find();
  res.json(posts);
});

router.put("/like/:id", async (req,res)=>{
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
});

router.post("/comment/:id", async (req,res)=>{
  const post = await Post.findById(req.params.id);
  post.comments.push({ text: req.body.text });
  await post.save();
  res.json(post);
});

module.exports = router;
