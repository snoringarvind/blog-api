const User = require("../models/User");
const Blog = require("../models/Blog");
const Viewer = require("../models/Viewer");
const { body, validationResult } = require("express-validator");
const utils = require("../lib/utils");
const passport = require("passport");

//home page
exports.blog_list_get = (req, res, next) => {
  Blog.find({}, (err, result) => {
    if (err) return next(err);
    if (result.length == 0) {
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

//login page
exports.blog_login_get = [
  (req, res, next) => {
    console.log("req.cookie=", req.cookies.jwt);
    console.log("authenticate=", req.authenticate);
    console.log("user=", req.user);
    console.log(req.isAuthenticated());
    return res.json({ msg: "you have successfully logged in" });
  },
];

exports.blog_login_post = (req, res, next) => {
  Viewer.findOne({ email: req.body.email }, (err, result) => {
    if (err) return next(err);
    if (result.password != req.body.password) {
      return res.status(200).json({ msg: "password wrong" });
    }
    if (result.password == req.body.password) {
      const tokenObject = utils.issueJWT(result);
      res.cookie("jwt", tokenObject.token, { maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).json(tokenObject);
    }
    ``;
  });
};

//signup page
exports.blog_signup_get = (req, res, next) => {
  res.status(200).json({ msg: "blog singup get not implemented" });
};

exports.blog_signup_post = [
  body("fname", "fname cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("lname", "lname cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("email", "email cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("passowrd", "passowrd cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    Viewer.findOne({ email: req.body.email }, (err, result) => {
      if (err) return next(err);
      if (result) {
        res.status(200).json({ msg: "a user with this email already exists" });
      }
      if (result == null) {
        const viewer = new Viewer({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: req.body.password,
        }).save((err) => {
          console.log(err);
          if (err) return next(err);
          res.json({ msg: "viewer saved" });
          return;
        });
      }
    });
  },
];
