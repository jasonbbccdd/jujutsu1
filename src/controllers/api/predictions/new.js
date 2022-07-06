import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPredictionsNew = async (req, res) => {
  try {
    const foundTournament = await prisma.tournament.findFirst({
      include: {
        groups: {
          orderBy: {
            code: 'asc'
          },
          include: {
            teamsOnGroups: {
              include: {
                team: {
                  include: {
                    confederation: true
                  }
                }
              },
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    })

    return res.status(200).json(foundTournament)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPredictionsNew
