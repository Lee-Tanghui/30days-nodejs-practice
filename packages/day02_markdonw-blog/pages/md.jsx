import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MarkdownIt from 'markdown-it';
import dynamic from 'next/dynamic';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Card, Input, Button, message } from 'antd';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import 'react-markdown-editor-lite/lib/index.css';

import { fetchUploadImage, fetchCreateBlog } from '../api/model';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});
const mdParser = new MarkdownIt();

function mdPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleEditorChange = function ({ html, text }) {
    setContent(text);
  };

  const onImageUpload = function (file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (data) => {
        const dataURL = data.target.result;
        const res = await fetchUploadImage(dataURL);
        if (!res.code) {
          resolve(res.data);
        }
      };
    });
  };

  const validate = function (title, content) {
    if (!title) {
      message.error('请填写文章标题');
      return false;
    }
    if (!content) {
      message.error('请填写文章内容');
      return false;
    }

    return true;
  };

  const onPublish = async function () {
    const valid = validate(title, content);
    if (valid) {
      setDisabled(true);
      const res = await fetchCreateBlog({ title, content });
      if (!res.code) {
        message.success(res.data);
        setTimeout(() => {
          router.push('/');
        }, 500);
      } else {
        setDisabled(false);
      }
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <title>Blog-创建</title>
      </Head>
      <Row>
        <Card className='w-full'>
          <Row className='flex pb-6'>
            <Col span={18}>
              <Input
                className='font-extrabold'
                style={{ fontSize: '22px' }}
                size='large'
                placeholder='请输入文章标题'
                bordered={false}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
            </Col>
            <Col style={{ display: 'flex' }} className='justify-end' span={6}>
              <Button
                size='large'
                type='primary'
                icon={<CloudUploadOutlined />}
                onClick={onPublish}
                disabled={disabled}
              >
                发布文章
              </Button>
            </Col>
          </Row>
          <MdEditor
            style={{ height: 'calc(100vh - 122px)' }}
            imageAccept='.jpg,.png,.jpeg'
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            onImageUpload={onImageUpload}
          />
        </Card>
      </Row>
    </Layout>
  );
}

export default mdPage;
