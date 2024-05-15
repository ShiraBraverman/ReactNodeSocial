const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    const userId = req.query.postId;
    res.send(await controller.getByPostId(userId));
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await controller.getById(id);
    res.send(user)
});

router.post("/", async (req, res) => {
    try {
        const { postId, name, email, body } = req.body;
        if (!postId || !name || !email || !body) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const response = await controller.create(postId, name, email, body);
        const data = await controller.getById(response.insertId);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.update(id, req.body.postId, req.body.name, req.body.email, req.body.body)
    res.send(await controller.getById(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.deleteComment(id);
    res.send();
});

module.exports = router