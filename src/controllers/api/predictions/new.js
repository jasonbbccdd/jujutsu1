import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPredictionsNew = async (req, res) => {
  try {
    // const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'groupId'
    const sortBy = req.query.sortBy || 'asc'

    const foundTeams = await prisma.tournament.findMany({
      where: {
        id: 4
      },
      include: {
        groups: {
          include: {
            teams: true
          }
        }
      }
    })

    return res.status(200).json({
      teams: foundTeams
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPredictionsNew
