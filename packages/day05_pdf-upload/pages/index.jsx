import { useState, useEffect } from 'react';
import { Layout, Row, Col, Card } from 'antd';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import UploadContainer from '../components/UploadContainer';

function HomePage() {
  const onChange = () => {
    console.log('上传改变');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row className='mt-8' justify='center'>
        <Col md={18} sm={24} xs={24}>
          <Card>
            <UploadContainer onChange={onChange}></UploadContainer>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default HomePage;
