import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Row, Col, Card, Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import List from '../components/List';
import { fetchBlogList } from '../api/model';

function HomePage() {
  const pageSize = 10;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      setLoading(true);
      const res = await fetchBlogList({ page, pageSize });
      if (!res.code) {
        const { total, list } = res.data;
        setData(
          list.map((item, index) => {
            item.key = index;
            return item;
          })
        );
        setTotal(total);
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <title>Blog-首页</title>
      </Head>
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
              data={data}
              loading={loading}
              onPageChange={setPage}
              total={total}
              current={page}
              pageSize={pageSize}
            ></List>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default HomePage;
