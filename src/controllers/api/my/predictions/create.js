import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const createSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  items: yup.array().of(yup.object({
    name: yup.string().required().label('name'),
    checked: yup.boolean().transform((value) => !!value)
  }))
})

const controllersApiMyPredictionsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newPrediction = await prisma.Prediction.create({
      data: {
        userId,
        ...verifiedData,
        items: {
          create: verifiedData?.items
        }
      }
    })
    return res.status(201).json(newPrediction)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPredictionsCreate
