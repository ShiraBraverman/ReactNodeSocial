const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    res.send(await controller.getAll());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await controller.getById(id);
    res.send(user)
});

router.post("/", async (req, res) => {
    try {
        const response = await controller.create(req.body.username, req.body.email, req.body.phone)
        res.send(await getUser(response.id));
    } catch (err) {
        throw err;
    }

});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await updateToy(id, req.body.name, req.body.price, req.body.description)
    res.send(await getUser(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await deleteToy(id);
    res.send();
});

module.exports = router
