import { Router } from 'express'
import IndexController from '@controllers/index.controller'
import { Routes } from '@interfaces/routes.interface'
import validationMiddleware from '@/middlewares/validation.middleware'
import { CreateHomeDto } from '@/dtos/home.dto'

class IndexRoute implements Routes {
  public path = '/'
  public router = Router()
  public indexController = new IndexController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}home`, validationMiddleware(CreateHomeDto, 'body'), this.indexController.home)
    this.router.get(`${this.path}home`, this.indexController.getPaginatedHome)
    this.router.get(`${this.path}postCode`, this.indexController.getPostcodes)
    this.router.get(`${this.path}postCode/:id(\\d+)`, this.indexController.getCalculatedPriceByPostcodeId)
  }
}

export default IndexRoute
