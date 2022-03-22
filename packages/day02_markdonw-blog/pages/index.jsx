import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Row, Col, Card, Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import List from '../components/List';
import { fetchBlogList } from '../api/model';

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetchBlogList();
    if (!res.code) {
      setData(res.data);
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row className='mt-8' justify='center'>
        <Col md={12} sm={24} xs={24}>
          <div className='flex justify-end'>
            <Link href='/md'>
              <Button className='mb-4' icon={<FormOutlined />} type='primary'>
                创建Blog
              </Button>
            </Link>
          </div>
          <Card>
            <List
              data={data.map((item, index) => {
                item.key = index;
                return item;
              })}
            ></List>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default HomePage;
