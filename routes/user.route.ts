import express from 'express';
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, updateAccessToken, updatePassword, updateUserInfo, updateUserRole } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

// userRouter.get('/refresh-token', updateAccessToken);

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);



userRouter.get('/logout-user', updateAccessToken, isAuthenticated, logoutUser);

userRouter.get('/me', updateAccessToken, isAuthenticated, getUserInfo);

userRouter.put('/update-user-info',updateAccessToken, isAuthenticated, updateUserInfo);

userRouter.put('/update-user-password',updateAccessToken, isAuthenticated, updatePassword);

userRouter.put('/update-user-role',updateAccessToken, isAuthenticated, authorizeRoles('admin'), updateUserRole);

userRouter.get('/get-users',updateAccessToken, isAuthenticated, authorizeRoles('admin'), getAllUsers);

userRouter.delete('/delete-user/:id',updateAccessToken, isAuthenticated, authorizeRoles('admin'), deleteUser);




export default userRouter;