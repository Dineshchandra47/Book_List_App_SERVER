const express = require("express");
const router = express.Router();
const bookModel = require("../models/book");
const bodyparser = require("body-parser");
const { validateToken } = require("../middleWares/middleware");
// router.use(bodyparser());
const cors = require("cors");
router.use(cors());

router.get("/api/books", validateToken, async (req, res) => {
  try {
    const data = await bookModel.find({ user: req.user });
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.post("/api/books/addBook", validateToken, async (req, res) => {
  try {
    let data = await bookModel.create({
      title: req.body.title,
      isbn: req.body.isbn,
      author: req.body.author,
      description: req.body.description,
      publisher: req.body.publisher,
      publishedDate: req.body.publish_date,
      user: req.user,
    });
    res.status(200).json({
      message: "Book Addded Successfully",
      item: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.delete("/api/books/:_id", validateToken, async (req, res) => {
  try {
    await bookModel.deleteOne({
      $and: [{ _id: { $eq: req.params._id } }, { user: { $eq: req.user } }],
    });
    res.status(200).json({
      status: "success",
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.put("/api/books/:_id", validateToken, async (req, res) => {
  try {
    await bookModel.update(
      {
        $and: [{ _id: { $eq: req.params._id } }, { user: { $eq: req.user } }],
      },
      {
        $set: {
          title: req.body.title,
          isbn: req.body.isbn,
          author: req.body.author,
          description: req.body.description,
          publisher: req.body.publisher,
          publishedDate: req.body.published_date,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Book Updated Succefully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

module.exports = router;
