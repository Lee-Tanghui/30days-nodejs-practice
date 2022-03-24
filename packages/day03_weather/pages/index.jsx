import { useState, useEffect } from 'react';
import { Layout, Row, Col, Card } from 'antd';
import { fetchHello } from '../api/model';
import Hello from '../components/Hello';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';

function HomePage() {
  const [data, setData] = useState('');
  useEffect(async () => {
    const res = await fetchHello();
    setData(res.data);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row className='mt-8' justify='center'>
        <Col md={12} sm={24} xs={24}>
          <Card>
            <Hello data={data}></Hello>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default HomePage;
