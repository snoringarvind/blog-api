const User = require("../models/User");
const Blog = require("../models/Blog");
const { body, validationResult } = require("express-validator");

//home page
exports.blog_list_get = (req, res, next) => {
  Blog.find({}, (err, result) => {
    if (err) return next(err);
    if (result == null) {
      res.status(200).json({ msg: "no blogs to display" });
    } else {
      res.status(200).json(result);
    }
  });
};

//detail page
exports.blog_detail_get = (req, res, next) => {
  Blog.findById(req.params.id, (err, result) => {
    if (err) return next(err);
    if (result == null) {
      res
        .status(200)
        .json({ msg: "couldn't find the blog you were looking for:(" });
    } else {
      res.status(200).json(result);
    }
  });
};

//create page
exports.blog_create_get = (req, res, next) => {
  res.send("blog create get not implemented");
};

exports.blog_create_post = [
  body("title", "title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "content cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    console.log("hello");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json(errors);
    } else {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
      }).save((err) => {
        if (err) return next(err);
        else {
          return res.redirect("/catalog/blogs");
        }
      });
    }
  },
];

//update page
exports.blog_update_get = (req, res, next) => {
  Blog.findById(req.params.id, (err, result) => {
    if (err) return next(err);
    if (result == null) {
      res.status(200).json({ msg: "couldnl't find the blog" });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.blog_update_put = [
  body("title", "title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "content cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      _id: req.params.id,
    });
    console.log("in update");
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(200).json({ result: blog, msg: errors });
    } else {
      Blog.findByIdAndUpdate(req.params.id, blog, {}, (err, theresult) => {
        console.log(theresult);
        if (err) return next(err);
        else {
          return res.redirect("/catalog/blog/" + req.params.id);
        }
      });
    }
  },
];

//delete page
exports.blog_remove_delete = (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) return next(err);
    else {
      res.redirect("/catalog/blogs");
    }
  });
};
