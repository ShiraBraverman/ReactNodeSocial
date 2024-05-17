express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    if (req.query.username) {
        const users = await controller.getByUsername(req.query.username);
        res.send(users);
    } else {
        res.send(await controller.getAll());
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await controller.getById(id);
    res.send(user)
});

router.post("/", async (req, res) => {
    try {
        const response = await controller.create(req.body.username, req.body.email, req.body.phone, req.body.city, req.body.street)
        res.send(await controller.getById(response.insertId));
    } catch (err) {
        throw err;
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.update(id, req.body.username, req.body.email, req.body.phone, req.body.city, req.body.street)
    res.send(await controller.getById(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.deleteUser(id);
    res.send();
});

module.exports = router;

