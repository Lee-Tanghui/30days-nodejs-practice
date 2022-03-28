import { Select } from 'antd';

const { Option } = Select;

function CityPicker({ currentCity, cityList, onCityChange }) {
  const options = cityList.map((city) => {
    return (
      <Option key={city.adcode} value={city.adcode}>
        {city.name}
      </Option>
    );
  });

  return (
    <div className='flex justify-end'>
      <Select
        value={currentCity ? currentCity.name : null}
        style={{ width: 180 }}
        onChange={onCityChange}
        placeholder='请选择省会城市'
      >
        {options}
      </Select>
    </div>
  );
}

export default CityPicker;
