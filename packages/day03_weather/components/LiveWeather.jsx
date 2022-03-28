import moment from 'moment';
import 'tailwindcss/tailwind.css';

function LiveWeather({ wetherInfo = {} }) {
  const {
    province,
    city,
    reporttime,
    temperature,
    weather,
    winddirection,
    windpower,
    humidity,
  } = wetherInfo;

  return (
    <div>
      <div>数据发布时间：{moment(reporttime).format('MM-DD HH:mm')}</div>
      <div className='pt-4  text-xl'>
        <span>{province}</span>
        <span className='px-2'>-</span>
        <span>{city}</span>
      </div>
      <div>
        <span className='inline-block text-4xl pt-4'>{temperature}°</span>
        <span className='inline-block pl-4 font-semibold'>{weather}</span>
      </div>
      <ul class='flex justify-between pl-6 pt-4'>
        <li className='py-2 mr-10'>风向：{winddirection}</li>
        <li className='py-2 mr-10'>风力：{windpower}</li>
        <li className='py-2 mr-10'>湿度：{humidity}</li>
      </ul>
    </div>
  );
}

export default LiveWeather;
