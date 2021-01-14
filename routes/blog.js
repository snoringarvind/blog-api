const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const isAuth = require("../lib/utils");

//home page
router.get("/blogs", blogController.blog_list_get);

//login
router.get("/blog/login", blogController.blog_login_get);
router.post("/blog/login", blogController.blog_login_post);

//register
router.get("/blog/signup", blogController.blog_signup_get);
router.post("/blog/signup", blogController.blog_signup_post);

//create page
router.get("/blog/create", blogController.blog_create_get);
router.post("/blog", blogController.blog_create_post);

//update page
router.get("/blog/:id/update", blogController.blog_update_get);
router.put("/blog/:id", blogController.blog_update_put);

//delete page
router.delete("/blog/:id", blogController.blog_remove_delete);

//get detail
router.get("/blog/:id", blogController.blog_detail_get);

module.exports = router;
