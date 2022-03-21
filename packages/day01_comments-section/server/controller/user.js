const UserModel = require('../model/User')
const RES_CODE = require('../tools/resCode');
const resClient = require('../tools/resClient')

const toggleLike = async(req, res, next) => {
  try {
    const { cid } = req.body
    const { uid } = req.session
    const type = await UserModel.toggleLike({ cid, uid })

    resClient.success({ res, data: type })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  toggleLike
}