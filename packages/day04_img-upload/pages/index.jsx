import { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Pagination } from 'antd';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import UploadContainer from '../components/UploadContainer';
import Images from '../components/Images';
import { fetchList } from '../api/model';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(20);
  // 获取图片列表
  const getList = async (page) => {
    setLoading(true);
    const res = await fetchList(page);
    if (!res.code) {
      setData(res.data.list);
      setTotal(res.data.total)
    }
    setLoading(false);
  };
  // 上传变动
  const onChange = () => getList(page);
  // 页码改变
  const onPageChange = (page) => {
    setPage(page)
    getList(page)
  };

  useEffect(() => {
    getList(page);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row className='mt-8' justify='center'>
        <Col md={18} sm={24} xs={24}>
          <Card>
            <UploadContainer onChange={onChange}></UploadContainer>
          </Card>
        </Col>
      </Row>
      <Row className='mt-4' justify='center'>
        <Col md={18} sm={24} xs={24}>
          <Card>
            <Images data={data} loading={loading}></Images>
            <Pagination
              onChange={onPageChange}
              total={total}
              defaultPageSize={12}
              position='end'
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default HomePage;
