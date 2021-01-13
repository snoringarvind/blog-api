const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

//home page
router.get("/blogs", blogController.blog_list_get);

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
