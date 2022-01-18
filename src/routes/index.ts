import express, { NextFunction, Request, Response } from 'express'
import categoriesRoutes  from './categories.routes'
import specificationRoutes  from './specification.routes'

const router = express.Router()

router.use('/categories', categoriesRoutes)
router.use('/specification', specificationRoutes)


router.get('/', (req:Request, res:Response, next:NextFunction)=>{
    return res.status(200).send(`Hello Mario!`)
})


export default router