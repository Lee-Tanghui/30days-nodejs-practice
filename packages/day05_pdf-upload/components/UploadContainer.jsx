import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchUpload } from '../api/model';
import filesize from 'filesize';

const MAX_SIZE = 40 * 1000 * 1000;

function UploadContainer({ onChange }) {
  const props = {
    accept: 'application/pdf',
    customRequest: async (option) => {
      const file = option.file;
      if (file.size >= MAX_SIZE) {
        return message.error(`文件过大，最大只支持${filesize(MAX_SIZE)}`);
      }
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetchUpload(formData);
      console.log(res);
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name}上传成功`);
        onChange();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}上传失败`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>上传PDF</Button>
    </Upload>
  );
}

export default UploadContainer;
