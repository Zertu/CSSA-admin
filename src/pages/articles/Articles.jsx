import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import Breadcrumb from "@/components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../actions/articles";
import AdvancedTable from "@/components/Table";
import { fetchTags } from "@/actions/tags";

function Articles() {
  const router = useNavigate();
  const isFetching = useSelector((state) => state.articles.isFetching);
  const articles = useSelector((state) => state.articles.articles);
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchTags());
  }, []);
  const handleDelete = (row) => {};
  const headers = [
    { key: "id", alias: "文章ID", width: "5%", render: (value) => value },
    { key: "title", alias: "标题", width: "15%", render: (value) => value },
    {
      key: "tags",
      alias: "标签",
      width: "15%",
      render: (value) =>
        value.map((i) => tags.find((j) => j.id == i)?.tag_name).join(", "),
    },
    {
      key: "draft",
      alias: "草稿状态",
      width: "10%",
      render: (value) => (value ? "是" : "否"),
    },
    { key: "summary", alias: "摘要", width: "15%", render: (value) => value },
    {
      key: "authors",
      alias: "作者",
      width: "10%",
      render: (value) => value.join(", "),
    },
    {
      key: "created_at",
      alias: "创建时间",
      width: "5%",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "updated_at",
      alias: "更新时间",
      width: "5%",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "operation",
      alias: "操作",
      width: "10%",
      render: (value, row) => {
        return (
          <div>
            <NavLink
              to={`/app/articles/edit/${row.id}`}
              className="btn-sm mr-1"
            >
              编辑
            </NavLink>
            <NavLink
              onClick={() => handleDelete(row)}
              className="color-red btn-sm"
            >
              删除
            </NavLink>
          </div>
        );
      },
    },
  ];

  const addNew = () => {
    router("new");
  };

  return (
    <div>
      <Breadcrumb />
      <Row>
        <Col sm={11}>
          <h1 className="mb-lg">Articles</h1>
        </Col>
        <Col sm={1} align-self="left">
          <div className="mt mt-lg flex justify-end">
            <div className="mt-lg" title="Some standard reactstrap components">
              <Row>
                <Col>
                  <div className="mt">
                    <Button
                      onClick={addNew}
                      size="sm"
                      color="success"
                      className="mr-sm mb-xs"
                    >
                      + New
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="table-responsive" style={{ backgroundColor: "#fff" }}>
            <AdvancedTable
              headers={headers}
              data={articles}
              isFetching={isFetching}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Articles;
