import { Row, Col, Input, Button } from 'antd';

const { TextArea } = Input;

function CommentInput({ comment, onChange, addComment }) {
  return (
    <div>
      <TextArea
        placeholder='请输入您的留言'
        autoSize={{ minRows: 2, maxRows: 6 }}
        value={comment}
        onChange={(e) => onChange(e.target.value)}
      ></TextArea>
      <Row justify='end'>
        <Col>
          <Button className='mt-4' type='primary' onClick={addComment}>
            发送
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CommentInput;
