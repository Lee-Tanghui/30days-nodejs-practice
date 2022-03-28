const mongoose = require('mongoose');
const { Schema } = mongoose;

const CityWeatherSchema = new Schema({
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  adcode: {
    type: String,
    required: String,
    index: true,
  },
  weather: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  winddirection: {
    type: String,
    required: true,
  },
  windpower: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  reporttime: {
    type: Date,
    required: true,
  },
});

CityWeatherSchema.statics = {
  /**
   * @desc 根据adcode查询数据
   * @param {String} adcode 城市adcode
   * @returns
   */
  async getByAdCode(adcode) {
    const result = await this.find({ adcode }, { _id: 0, __v: 0 })
      .sort({
        reporttime: -1,
      })
      .lean();
    if (result && result.length) {
      return result[0];
    } else {
      return null;
    }
  },
};

module.exports = mongoose.model('city-weather', CityWeatherSchema);
