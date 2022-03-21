const UserModel = require('../model/User')
const RES_CODE = require('../../../@common/resCode');

const toggleLike = async(req, res, next) => {
  try {
    const { cid } = req.body
    const { uid } = req.session
    const type = await UserModel.toggleLike({ cid, uid })

    res.json({
      code: RES_CODE.SUCCESS,
      data: type 
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  toggleLike
}