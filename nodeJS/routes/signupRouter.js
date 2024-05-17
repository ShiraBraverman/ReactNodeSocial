const express = require("express");
const router = express.Router();
const userscontroller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
    try {
        const fulluser = req.body;
        console.log(req.body)
        if (!fulluser) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const userId = await userscontroller.create(
            fulluser.username,
            fulluser.email,        
            fulluser.phone,
            fulluser.street,
            fulluser.city,
            fulluser.password
        );
        const user = await userscontroller.getById(userId.insertId);
        res.send(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router