import { Avatar } from 'antd';
import {
  LikeOutlined,
  DeleteOutlined,
  LikeTwoTone,
  UserOutlined,
} from '@ant-design/icons';

function CommentList({ data, toggleLike, deleteComment }) {
  return (
    <div>
      {data.map((item, index) => {
        return (
          <section className='flex p-4 mb-2' key={index}>
            <Avatar size='large' icon={<UserOutlined />} />
            <div className='flex flex-col flex-grow  ml-3'>
              <div className='flex justify-between'>
                <div className='text-sm font-bold'>{item.name}</div>
                <div className='text-xs text-gray-600'>{item.date}</div>
              </div>
              <div className='text-base mt-4'>{item.content}</div>
              <div className='flex items-center justify-between mt-2 text-gray-500 cursor-pointer'>
                <div
                  className='flex items-center'
                  onClick={() => toggleLike(item.cid)}
                >
                  {item.liked ? <LikeTwoTone /> : <LikeOutlined />}
                  <span className={['ml-1', item.liked ? 'text-blue-400' : null ].join(' ')}>{item.like}</span>
                </div>
                {item.allowedDelete ? <DeleteOutlined onClick={() => deleteComment(item.cid)}/> : ''}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default CommentList;
