const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Form = require("../models/Form");
const Comment = require("../models/Comment");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");

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
    const { search, status } = req.query;

    if (page <= 0) {
      return res.status(400).json({ msg: "Geçersiz sayfa numarası" });
    }

    let formsQuery = {};

    if (search) {
      const nameSurnameParts = search.split(" ");

      if (nameSurnameParts.length === 2) {
        const [name, surname] = nameSurnameParts;

        formsQuery = {
          $or: [
            { code: !isNaN(search) ? parseInt(search) : null },
            {
              $and: [
                { name: { $regex: new RegExp(name, "i") } },
                { surname: { $regex: new RegExp(surname, "i") } },
              ],
            },
            { reason: { $regex: search, $options: "i" } },
          ],
        };
      } else {
        formsQuery = {
          $or: [
            { code: !isNaN(search) ? parseInt(search) : null },
            { name: { $regex: new RegExp(search, "i") } },
            { surname: { $regex: new RegExp(search, "i") } },
            { reason: { $regex: search, $options: "i" } },
          ],
        };
      }
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
  try {
    const newForm = new Form({
      name,
      surname,
      age,
      identity,
      reason,
      address,
      code: crypto
        .randomBytes(Math.ceil(8 / 2))
        .toString("hex")
        .slice(0, 8)
        .toUpperCase(),
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

// @route   GET /api/forms/statistics
// @desc    Get forms statistics
// @access  Private
router.get("/statistics", auth, async (req, res) => {
  try {
    const forms = await Form.find({});
    const weekStatistics = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const count = forms.filter(
        (form) =>
          form.createdAt.getDate() === date.getDate() &&
          form.createdAt.getMonth() === date.getMonth() &&
          form.createdAt.getFullYear() === date.getFullYear()
      ).length;
      weekStatistics.push({
        date: date.toLocaleDateString("tr-TR", { weekday: "long" }),
        count,
      });
    }

    const statistics = {
      total: forms.length,
      pending: forms.filter((form) => form.status === 0).length,
      completed: forms.filter((form) => form.status === 1).length,
      canceled: forms.filter((form) => form.status === 2).length,
      week: weekStatistics,
    };

    res.json(statistics);
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
      code: req.params.code.toUpperCase(),
    }).populate("comments");
    if (!form) {
      return res.status(404).json({
        msg: "Form bulunamadı",
      });
    }
    res.json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu hatası");
  }
});

// @route   PUT /api/forms/:code
// @desc    Update form status and comments by code
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
    const { comment, status } = req.body;

    if (comment) {
      const newComment = new Comment({
        form: form._id,
        comment,
      });
      await newComment.save();
      form.comments.push(newComment._id);
    }
    if (status) {
      form.status = status;
    }
    await form.save();
    await form.populate("comments");
    res.json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu hatası");
  }
});

module.exports = router;
