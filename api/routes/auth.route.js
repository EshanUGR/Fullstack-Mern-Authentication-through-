import express from 'express'
import {Signup,signin} from '../controllers/auth.controller.js'

const router=express.Router();

router.post("/signup",Signup);
router.post("/signin",signin)
export default router;






