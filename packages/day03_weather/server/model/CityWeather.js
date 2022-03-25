const mongoose = require('mongoose');
const { Schema } = mongoose;

const WeatherInfoSchema = new Schema(
  {
    date: String,
    week: String,
    dayweather: String,
    nightweather: String,
    daytemp: String,
    nighttemp: String,
    daywind: String,
    nightwind: String,
    daypower: String,
    nightpower: String,
  },
  {
    _id: false,
  }
);

const CityWeatherSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  adcode: {
    type: String,
    required: true,
    index: true,
  },
  reporttime: {
    type: Date,
    required: true,
    index: true,
  },
  live: {
    type: WeatherInfoSchema,
  },
  casts: {
    type: [WeatherInfoSchema],
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
