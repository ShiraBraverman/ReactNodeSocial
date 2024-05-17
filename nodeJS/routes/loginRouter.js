const express = require("express");
const router = express.Router();
const controller = require('../controllers/passwordsController')
const userscontroller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        console.log('1')
        const authenticated = await controller.authenticate(username, password);
        console.log(authenticated)
        if (authenticated) {
            const user = await userscontroller.getByUsername(username);
            res.send(user);
        }
        else {
            return res.status(403).json({ error: "Incorrect password or username" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router