import { List, Card } from 'antd';
import ImageRender from './ImageRender.jsx';

function Images({ data, loading }) {
  return (
    <div>
      <List
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Card>
              {<ImageRender id={item._id}></ImageRender>}
              <div>{item.filename}</div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Images;
