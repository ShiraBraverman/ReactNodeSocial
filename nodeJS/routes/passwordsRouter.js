const express = require("express");
const router = express.Router();
const controller = require('../controllers/passwordsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// router.get("/", async (req, res) => {
//     res.send(await controller.getAll());
// })

// router.get("/:id", async (req, res) => {
//     const id = req.params.id;
//     const user = await controller.getById(id);
//     res.send(user)
// });

router.post("/", async (req, res) => {
    try {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const response = await controller.create(userId, password);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.update(id, req.body.userId, req.body.password)
    res.send(await controller.getById(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.deletePasswors(id);
    res.send();
});

module.exports = router