import axios from 'axios';
import { useState } from 'react';
import { Layout, Row, Col, Empty, Card, message } from 'antd';
import api from '../api/api';
import {
  fetchCommentList,
  fetchAddComment,
  fetchCommentLike,
  fetctCommentDel,
} from '../api/model';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';

import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

export async function getServerSideProps(context) {
  const res = await axios({
    method: 'get',
    url: api.comment,
    headers: context.req.headers,
  });
  return {
    props: {
      data: !res.data.code ? res.data.data : [],
    },
  };
}

function HomePage({ data }) {
  const [comment, setComment] = useState('');
  const [list, setList] = useState(data);

  // 添加留言
  const addComment = async () => {
    if (!comment) {
      message.error('请输入留言');
      return;
    }
    const res = await fetchAddComment(comment);
    if (!res.code) {
      message.success('发送成功');
      setComment('');
      const listRes = await fetchCommentList();
      !listRes.code && setList(listRes.data);
    }
  };

  // 点击like icon
  const toggleLike = async (cid) => {
    const res = await fetchCommentLike(cid);
    if (!res.code) {
      const { data } = res;
      setList(
        list.map((comment) => {
          if (comment.cid === cid) {
            comment.like = comment.like + data;
            comment.liked = data < 0 ? false : true;
          }
          return comment;
        })
      );
    }
  };

  // 删除评论
  const deleteComment = async (cid) => {
    const res = await fetctCommentDel(cid);
    if (!res.code) {
      message.success('删除成功')
      const listRes = await fetchCommentList();
      !listRes.code && setList(listRes.data);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row className='mt-8' justify='center'>
        <Col md={12} sm={24} xs={24}>
          <Card title='留言输入框'>
            <CommentInput
              comment={comment}
              onChange={(data) => setComment(data)}
              addComment={addComment}
            ></CommentInput>
          </Card>
        </Col>
      </Row>
      <Row className='mt-4 mb-4' justify='center'>
        <Col md={12} sm={24} xs={24}>
          <Card>
            <p className='text-color'>只展示最新20条留言（2小时后删除）</p>
            {list.length ? (
              <CommentList
                data={list}
                toggleLike={toggleLike}
                deleteComment={deleteComment}
              ></CommentList>
            ) : (
              <Empty description='暂无留言数据'></Empty>
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default HomePage;
