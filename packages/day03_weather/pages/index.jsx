import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Skeleton } from 'antd';
import { fetchCityList, fetchCityWeather } from '../api/model';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';

import LiveWeather from '../components/LiveWeather';
import CityPicker from '../components/CityPicker';

function HomePage() {
  const [cityList, setCityList] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [wetherInfo, setWeatherInfo] = useState(null);

  const getCityWeather = async (adcode) => {
    const weatherRes = await fetchCityWeather(adcode);
    if (!weatherRes.code) {
      setWeatherInfo(weatherRes.data);
    }
  };

  const onCityChange = (adcode) => {
    const res = cityList.filter((i) => i.adcode === adcode);
    if (res.length) {
      setCurrentCity(res[0]);
    }
  };

  useEffect(async () => {
    const cityRes = await fetchCityList();
    if (!cityRes.code) {
      setCityList(cityRes.data);
      setCurrentCity(cityRes.data[0]);
    }
  }, []);

  useEffect(async () => {
    if (currentCity) {
      getCityWeather(currentCity.adcode);
    }
  }, [currentCity]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <title>省会城市-天气查询</title>
      </Head>
      <Row className='mt-8' justify='center'>
        <Col md={12} sm={24} xs={24}>
          <CityPicker
            currentCity={currentCity}
            cityList={cityList}
            onCityChange={onCityChange}
          ></CityPicker>
          <Card style={{ marginTop: '20px' }}>
            {wetherInfo ? (
              <LiveWeather wetherInfo={wetherInfo}></LiveWeather>
            ) : (
              <Skeleton></Skeleton>
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default HomePage;
