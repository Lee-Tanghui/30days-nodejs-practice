import { useRouter } from 'next/router';
import { Table, Button } from 'antd';

function List({ data, onPageChange, total, pageSize, current, loading }) {
  const router = useRouter();

  const preview = function (bid) {
    router.push({
      pathname: '/preview',
      query: { bid: bid },
    });
  };

  const onChange = function (pagination, filters, sorter, extra) {
    if (extra.action === 'paginate') {
      onPageChange(pagination.current);
    }
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '50%',
    },
    {
      title: '创建日期',
      dataIndex: 'create_date',
      key: 'create_date',
    },
    {
      title: '操作',
      dataIndex: 'bid',
      key: 'bid',
      render: (bid) => {
        return (
          <Button key={bid} onClick={() => preview(bid)}>
            查看
          </Button>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
      onChange={onChange}
      loading={loading}
      pagination={{ total, pageSize, current }}
    />
  );
}

export default List;
