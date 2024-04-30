import { useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import Breadcrumb from "@/components/Breadcrumb";
import Widget from "@/components/Widget/Widget";
import AdvancedTable from "@/components/Table";
import { fetchArticles } from "@/actions/articles";
import { useDispatch, useSelector } from "react-redux";

const TagList = () => {
  const handleDelete=(row)=>{}
  const isFetching = useSelector((state) => state.articles.isFetching);
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles())
  }, []);
  const headers = [
    { key: "id", alias: "文章ID", width: "5%", render: (value) => value },
    { key: "title", alias: "标题", width: "15%", render: (value) => value },
    { key: "tags", alias: "标签", width: "15%", render: (value) => value.join(', ') },
    { key: "draft", alias: "草稿状态", width: "10%", render: (value) => value ? '是' : '否' },
    { key: "summary", alias: "摘要", width: "15%", render: (value) => value },
    { key: "authors", alias: "作者", width: "10%", render: (value) => value.join(', ') },
    { key: "created_at", alias: "创建时间", width: "5%", render: (value) => new Date(value).toLocaleDateString() },
    { key: "updated_at", alias: "更新时间", width: "5%", render: (value) => new Date(value).toLocaleDateString() },
    { key: "operation", alias: "操作", width: "10%", render: (value,row) => {
      return (
        <div>
          <Button to={`/app/articles/edit/${row.id}`} className="mr-1">编辑</Button>
          <Button onClick={()=>handleDelete(row)} className="btn-sm">删除</Button>
        </div>
      )
    
    } }
  ];
  return (
    <div>
      <Breadcrumb />

      <h1 className="page-title">Tags List</h1>

      <Row>
        <Col md={12} sm={24} xs={24}>
            <div>
            <AdvancedTable headers={headers} data={articles} isFetching={isFetching} />
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default TagList;
