import express from 'express'
import routes from '../routes'
import { users ,userEdit} from '../controllers/UserController'
const userRouter = express.Router()

userRouter.get('/:id', users)
userRouter.get(routes.USER_EDIT, userEdit)

export default userRouter