const UserModel = require('../model/User')
const HTTP_STATUS = require('../../../@common/httpStatus');
const RES_CODE = require('../../../@common/resCode');

const toggleLike = async(req, res) => {
  try {
    const { cid } = req.body
    const { uid } = req.session
    const type = await UserModel.toggleLike({ cid, uid })

    res.json({
      code: RES_CODE.SUCCESS,
      data: type 
    })

  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RES_CODE.ERROR,
      errMsg: RES_CODE.INNER_ERROR,
    });
  }
}

module.exports = {
  toggleLike
}