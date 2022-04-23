import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchUpload } from '../api/model';

const MAX_SIZE = 40 * 1000 * 1000;

function UploadContainer({ onChange }) {
  const props = {
    accept: 'application/pdf',
    customRequest: (option) => {
      const file = option.file;
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async (event) => {
        if (event.loaded >= MAX_SIZE) {
          message.error('最大只支持40M的文件！');
          return;
        }
        const data = event.target.result;
        const result = await fetchUpload({
          file: data,
          path: './mypath',
        });
        console.log(result);
      };
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
