import { CreateHomeDto } from '@/dtos/home.dto'
import { HomeEntity } from '@/entities/home.entity'
import { Home } from '@/interfaces/home.interface'
import { Repository } from 'typeorm'

class HomeService extends Repository<HomeEntity> {
  public async createHome(homeData: CreateHomeDto): Promise<Home> {
    const createHomeData: Home = await HomeEntity.create(homeData).save()
    return createHomeData
  }

  public async paginate(skip = 0, take = 5) {
    const homes: Home[] = await HomeEntity.createQueryBuilder('home').skip(skip).take(take).getMany()
    const count = await HomeEntity.createQueryBuilder('home').getCount()

    return { homes, count }
  }

  public async getPostcodes(): Promise<Pick<Home, 'post_code'>[]> {
    const query = HomeEntity.createQueryBuilder('home').select('post_code').distinct(true)
    const postcodes = await query.getRawMany()

    return postcodes
  }

  public async getCalculatedPriceByPostcodeId(postcode: number): Promise<{ average: number; median: number }> {
    const homes: Home[] = await HomeEntity.createQueryBuilder('home').where(`home.post_code = '${postcode}'`).getMany()
    const prices = homes.map(each => each.price).sort()
    const average = prices.reduce((sum, price) => sum + price, 0) / homes.length
    const median =
      prices.length % 2
        ? prices[(prices.length - 1) / 2]
        : (prices[prices.length / 2] + prices[prices.length / 2 - 1]) / 2

    return { average, median }
  }
}

export default HomeService
