const router = require("express").Router();
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
router.route('/category')
.get(categoryCtrl.getCategories)
.post(auth , authAdmin , categoryCtrl.create)


router.route('/category/:id')
.delete(auth , authAdmin , categoryCtrl.remove)
.put(auth , authAdmin , categoryCtrl.update)

module.exports = router