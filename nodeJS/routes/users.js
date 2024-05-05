const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
const { getUser, getUsers,} = require('../models/usersModels')


router.get("/", async(req, res) => {
    res.send(await getUsers());
})
router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const toy = await getUser(id);
    res.send(toy)
});
// router.post("/", async(req, res) => {
//     try{
//         const response=await controller.create(req.body.name,req.body.price,req.body.description)
//         res.send(await getUser(response.insertId));
//     }catch(err){
//         res.sendFile(path.join(__dirname, '../public', 'error.html'));
//     }
   
// });
// router.put("/:id", async(req, res) => {
//     const id = req.params.id;
//     const response=await updateToy(id,req.body.name,req.body.price,req.body.description)
//     res.send(await getUser(id));
// });
// router.delete("/:id", async(req, res) => {
//     const id = req.params.id;
//     const response=await deleteToy(id);

//     res.send();
// });
module.exports = router
