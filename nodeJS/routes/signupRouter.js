const express = require("express");
const router = express.Router();
const controller = require('../controllers/passwordsController')
const userscontroller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
    try {
        const fulluser = req.body;
        console.log(123)
        console.log(req.body)
        if (!fulluser) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        console.log('1')
        const userId = await userscontroller.create(
            fulluser.username,
            fulluser.phone,
            fulluser.email,
            fulluser.street,
            fulluser.city
        );
        console.log(userId, fulluser.password)
        const createP = await controller.create(userId.insertId, fulluser.password);
        console.log(createP)
        const user = await userscontroller.getById(userId.insertId);
        res.send(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router