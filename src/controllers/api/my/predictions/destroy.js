import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const controllersApiPredictionsDestroy = async (req, res) => {
  try {
    const { params: { id } } = req
    const deletedPrediction = await prisma.prediction.delete({ where: { id: Number(id) } })
    return res.status(200).json(deletedPrediction)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiPredictionsDestroy
]
