import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../api/api'

function UploadContainer({ onChange}) {
  const props = {
    name: 'file',
    action: api.upload,
    accept: "image/png,image/jpg,image/jpeg",
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name}上传成功`);
        onChange()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}上传失败`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>上传图片</Button>
    </Upload>
  );
}

export default UploadContainer;
