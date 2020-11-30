const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/user')
const uploadImage = require('../middlewares/multer')
const { authentication, authorization, authorizationAdmin } = require('../middlewares/auth')

router.get('/', authentication, authorizationAdmin, UserController.list)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/profile', authentication, UserController.profile)
router.put('/editprofile', authentication, UserController.editUserData)
router.put('/editphoto', authentication, uploadImage, UserController.editUserPhoto)
router.put('/changepassword', authentication, UserController.editUserPassword)
router.delete('/delete', authentication, UserController.deleteUser)
router.post('/forgotpassword', UserController.forgotPasswordForm)
router.put('/resetpassword/:id', UserController.resetPassword)

module.exports = router;