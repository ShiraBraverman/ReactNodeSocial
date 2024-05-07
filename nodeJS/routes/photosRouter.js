const express = require("express");
const router = express.Router();
const controller = require('../controllers/photosController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    const albumId = req.query.albumId;
    const page = req.query._page;
    const limit = req.query._limit;
    res.send(await controller.getAll(albumId, page, limit));
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await controller.getById(id);
    res.send(user)
});

router.post("/", async (req, res) => {
    try {
        const { albumId, title, url, thumbnailUrl } = req.body;
        if (!albumId || !title || !url || !thumbnailUrl) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const response = await controller.create(albumId, title, url, thumbnailUrl);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.update(id, req.body.albumId, req.body.title, req.body.url, req.body.thumbnailUrl)
    res.send(await controller.getById(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.deletePhoto(id);
    res.send();
});

module.exports = router