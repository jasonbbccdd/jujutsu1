import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyPredictionsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Filters
    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    // Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      userId,
      OR: [
        {
          title: {
            contains: q
          }
        }, {
          description: {
            contains: q
          }
        }
      ]
    }

    const totalMyPredictions = await prisma.Prediction.count({ where })
    const foundMyPredictions = await prisma.Prediction.findMany({
      take,
      skip,
      where,
      orderBy: {
        [orderBy]: sortBy
      },
      include: {
        user: {
          select: {
            avatar: true
          }
        }
      }
    })

    return res.status(200).json({
      predictions: foundMyPredictions,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyPredictions / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPredictionsIndex
