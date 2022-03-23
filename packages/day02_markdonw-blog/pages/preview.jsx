import axios from 'axios';
import MarkdownIt from 'markdown-it';
import dynamic from 'next/dynamic';
import { Layout, Row, Col } from 'antd';
import api from '../api/api';

import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});
const mdParser = new MarkdownIt();

export async function getServerSideProps(context) {
  const bid = context.query.bid;

  try {
    const res = await axios({
      method: 'GET',
      url: api.getBlogContent,
      params: { bid },
      headers: context.req.headers,
    });

    return {
      props: {
        bid: context.query.bid,
        data: res.data.data,
      },
    };
  } catch (error) {
    const { data, status } = error.response;
    const { errMsg } = data;
    return {
      redirect: {
        destination: `/error?status=${status}&errMsg=${encodeURIComponent(
          errMsg
        )}`,
      },
    };
  }
}

function PreviewPage({ data }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row justify='center' className='mt-6 '>
        <Col xs={24} sm={24} md={24} lg={18} xl={14}>
          <h1>{data.title}</h1>
        </Col>
      </Row>
      <Row justify='center' className='mt-4 mb-4'>
        <Col xs={24} sm={24} md={24} lg={18} xl={14}>
          <MdEditor
            style={{
              height: 'auto',
              minHeight: 'calc(100vh - 120px)',
              border: 'none',
            }}
            value={data.content}
            readOnly={true}
            view={{ menu: false, md: false }}
            renderHTML={(text) => mdParser.render(text)}
          />
        </Col>
      </Row>
    </Layout>
  );
}

export default PreviewPage;
