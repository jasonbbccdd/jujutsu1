import yup from 'yup'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const updateSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  items: yup.array().of(yup.object({
    name: yup.string().required().label('name'),
    checked: yup.boolean().transform((value) => !!value)
  }))
})

const controllersApiPredictionsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updated = await prisma.prediction.update({
      where: { id: Number(id) },
      data: {
        ...verifiedData,
        items: {
          deleteMany: {},
          create: verifiedData?.items
        }
      }
    })
    return res.status(200).json(updated)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiPredictionsUpdate
]
