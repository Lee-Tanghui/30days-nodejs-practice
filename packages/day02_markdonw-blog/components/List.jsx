import { Table, Button } from 'antd';

function List({ data }) {
  const preview = function (cid) {
    console.log(cid);
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
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
  return <Table dataSource={data} columns={columns} />;
}

export default List;
