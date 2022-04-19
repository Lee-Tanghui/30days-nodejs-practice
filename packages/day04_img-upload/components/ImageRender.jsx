import { useEffect, useState } from 'react';
import { Image }  from 'antd'
import { fetchImage } from '../api/model';

function ImageRender({ id }) {
  const [src, setSrc] = useState('');
  const getSrc = async (id) => {
    const res = await fetchImage(id);
    if (!res.code) {
      setSrc(res.data);
    }
  };
  useEffect(() => {
    getSrc(id);
  }, []);

  return <div>{src ? <Image src={src}></Image> : ''}</div>;
}

export default ImageRender;
