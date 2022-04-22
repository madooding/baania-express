import { CreateHomeDto } from '@/dtos/home.dto'
import { Home } from '@/interfaces/home.interface'
import HomeService from '@/services/home.service'
import { NextFunction, Request, Response } from 'express'

export default class IndexController {
  public homeService: HomeService

  constructor() {
    this.homeService = new HomeService()
  }

  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  public home = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const homeData: CreateHomeDto = req.body
      const createHomeData: Home = await this.homeService.createHome(homeData)
      res.status(201).json(createHomeData)
    } catch (error) {
      next(error)
    }
  }

  public getPaginatedHome = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = Number(req.query.skip) || 0
      const take = Number(req.query.take) || 5

      const homes: Home[] = await this.homeService.paginate(skip, take)

      res.status(200).json({ payload: homes, count: homes.length })
    } catch (error) {
      next(error)
    }
  }

  public getPostcodes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postcodes: Pick<Home, 'post_code'>[] = await this.homeService.getPostcodes()

      res.status(200).json({ payload: postcodes, count: postcodes.length })
    } catch (error) {
      next(error)
    }
  }

  public getCalculatedPriceByPostcodeId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postcode = Number(req.params.id)

      const result = await this.homeService.getCalculatedPriceByPostcodeId(postcode)
      res.status(200).json({ payload: result })
    } catch (error) {
      next(error)
    }
  }
}
