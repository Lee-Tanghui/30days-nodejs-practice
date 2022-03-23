import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';

export async function getServerSideProps(context) {
  const { status, errMsg } = context.query;

  return {
    props: {
      status: status || 500,
      errMsg: errMsg || '未知错误',
    },
  };
}

const ErrorPage = function ({ status, errMsg }) {
  return (
    <div className='pt-40'>
      <div className='flex justify-center'>
        <img className='flex-none' src='/error.png'></img>
      </div>
      <div className='flex justify-center pt-6 items-center'>
        <span className='text-gray-500 text-3xl pr-4'>{status}</span>
        <span className='text-gray-300 text-2xl'>{errMsg}</span>
      </div>
    </div>
  );
};

export default ErrorPage;
