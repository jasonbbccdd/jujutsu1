import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPredictionsShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundPrediction = await prisma.prediction.findUnique({
      where: { id: Number(id) },
      rejectOnNotFound: true,
      include: {
        items: true,
        user: {
          select: {
            avatar: true
          }
        }
      }
    })
    return res.status(200).json(foundPrediction)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPredictionsShow
