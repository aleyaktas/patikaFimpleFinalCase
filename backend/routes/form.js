const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Form = require("../models/Form");
const Comment = require("../models/Comment");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   GET /api/forms
// @desc    Get forms with pagination and limit
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const { search, status, createdAt } = req.query;

    if (page <= 0) {
      return res.status(400).json({ msg: "Geçersiz sayfa numarası" });
    }

    let formsQuery = {};

    if (search) {
      formsQuery = {
        $or: [
          { code: { $regex: new RegExp(search, "i") } },
          { name: { $regex: new RegExp(search, "i") } },
          { surname: { $regex: new RegExp(search, "i") } },
          { reason: { $regex: new RegExp(search, "i") } },
        ],
      };
    }

    if (status) {
      formsQuery.status = status;
    }

    const forms = await Form.find(formsQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .exec();

    res.json({
      count: await Form.countDocuments(formsQuery),
      forms,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu hatası");
  }
});

// @route   POST /api/forms
// @desc    Create a form
// @access  Public
router.post("/", upload.array("files"), async (req, res) => {
  const { name, surname, age, identity, reason, address } = req.body;
  console.log(req.files);
  try {
    const newForm = new Form({
      name,
      surname,
      age,
      identity,
      reason,
      address,
    });
    const form = await newForm.save();

    if (req.files) {
      const filePromises = req.files.map(async (file) => {
        const newFileName = `${form._id}-${file.originalname
          .split(" ")
          .join("")}`;
        const newFilePath = `uploads/${newFileName}`;

        fs.renameSync(`uploads/${file.filename}`, newFilePath);

        return newFilePath;
      });

      form.files = await Promise.all(filePromises);
      await form.save();
    }

    res.json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu hatası");
  }
});

// @route   GET /api/forms/:code
// @desc    Get  form by code
// @access  Public
router.get("/:code", async (req, res) => {
  try {
    const form = await Form.findOne({
      code: req.params.code,
    });
    if (!form) {
      return res.status(404).json({
        msg: "Form bulunamadı",
      });
    }

    const comments = await Comment.find({
      form: form._id,
    });

    res.json({
      ...form.toObject(),
      comments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu hatası");
  }
});

// @route   PUT /api/forms/:code
// @desc    Update form status by code
// @access  Private
router.put("/:code", auth, async (req, res) => {
  try {
    const form = await Form.findOne({
      code: req.params.code,
    });

    if (!form) {
      return res.status(404).json({
        msg: "Form bulunamadı",
      });
    }

    form.status = req.body.status;
    await form.save();
    res.json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu hatası");
  }
});

// @route   GET /api/forms/search
// @desc    Search forms by all fields
// @access  Private
router.get("/search", auth, async (req, res) => {
  try {
    const { searchKey } = req.query;

    const forms = await Form.find({
      $or: [
        { name: { $regex: searchKey, $options: "i" } },
        { surname: { $regex: searchKey, $options: "i" } },
        { code: { $regex: searchKey, $options: "i" } },
        { reason: { $regex: searchKey, $options: "i" } },
      ],
    });

    res.json(forms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu hatası");
  }
});

module.exports = router;
