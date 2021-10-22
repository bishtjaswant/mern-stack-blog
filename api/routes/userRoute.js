const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const userModel = require('../models/User');

/* 
[listing user] 
localhost:3000/api/v1/user/all
*/
router.get("/all", async (req, res, next) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({ status: true, data: { users } });
    } catch (error) {
        console.log(error)
    }
})





/* user account updating by given userid 
[update user] 
localhost:3000/api/v1/user/update:id
*/
router.put("/update/:id", async (req, res, next) => {
    try {
        /**userId anD id both must be match */
        if (req.body.userId == req.params.id) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
            }

            const update = await userModel.findByIdAndUpdate(req.body.userId, req.body, {
                new: true
            });
            res.status(200).json({ status: true, data: { message: ' account updated', update } });

        } else {
            res.status(404).json({ status: false, data: { message: 'You can update only your account' } })
        }
    } catch (error) {
        console.log(error)
    }
});




/* user account deletion by given userid 
[deletion user] 
localhost:3000/api/v1/user/delete/:id
*/
router.delete("/delete/:id", async (req, res, next) => {
    try {
        /**userId anD id both must be match */
        if (req.body.userId == req.params.id) {

            
            try {
                const user = await userModel.findOne({ _id: req.body.userId });
                if (!user) {
                    return    res.status(404).json({ status: false, data: { message: 'user did  not found' } });
                }
                await userModel.findByIdAndRemove(req.body.userId, req.body);
                res.status(200).json({ status: true, data: { message: ' account deleted' } });

            } catch (error) {
                console.log(error)

            }
        } else {
            res.status(404).json({ status: false, data: { message: 'You can delete only your account' } })
        }
    } catch (error) {
        console.log(error)
    }
});













/* user account deletion by given userid 
[delete user] 
localhost:3000/api/v1/user/:id
*/
router.get("/:id", async (req, res, next) => {
    try {
        /**userId anD id both must be match */
        if (req.body.userId == req.params.id) {

            
            try {
                const user = await userModel.findOne({ _id: req.body.userId });
                if (!user) {
                    return    res.status(404).json({ status: false, data: { message: 'user did  not found' } });
                }
              
             return   res.status(200).json({ status: true, data: { user } });

            } catch (error) {
                console.log(error)

            }
        } else {
            res.status(404).json({ status: false, data: { message: 'You can view only your record' } })
        }
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;