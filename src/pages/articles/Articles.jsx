import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  ButtonGroup,
  Progress,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../actions/articles";
import AdvancedTable from "@/components/Table";

function Articles() {
  const router = useNavigate();
  const isFetching = useSelector((state) => state.articles.isFetching);
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles())
  }, []);
  const handleDelete=(row)=>{}
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
          <Link to={`/articles/${row.id}`} className="btn btn-primary btn-sm mr-1">编辑</Link>
          <Link onClick={()=>handleDelete(row)} className="btn btn-danger btn-sm">删除</Link>
        </div>
      )
    
    } }
  ];
  
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const addNew = () => {
    router("new");
  };
  const toggleDropdown = () => {
    setIsDropdownOpened((prevState) => !prevState);
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Articles</BreadcrumbItem>
      </Breadcrumb>
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
                onClick={addNew} size="sm" color="success" className="mr-sm mb-xs">
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
            <AdvancedTable headers={headers} data={articles} isFetching={isFetching} />
          </div>
          <ListGroup>
            <Link to="/app" className="list-group-item">
              <i className="fa fa-phone mr-xs text-secondary" /> Incoming calls{" "}
              <Badge className="ml-xs" color="danger">
                3
              </Badge>
            </Link>
            <Link to="/app" className="list-group-item">
              <i className="fa fa-bell-o mr-xs text-secondary" /> Notifications{" "}
              <Badge className="ml-xs" color="warning">
                6
              </Badge>
            </Link>
            <Link to="/app" className="list-group-item">
              <i className="fa fa-comment-o mr-xs text-secondary" /> Messages{" "}
              <Badge className="ml-xs" color="success">
                18
              </Badge>
            </Link>
            <Link to="/app" className="list-group-item">
              <i className="fa fa-eye mr-xs text-secondary" /> Visits total
            </Link>
            <Link to="/app" className="list-group-item">
              <i className="fa fa-cloud mr-xs text-secondary" /> Inbox{" "}
            </Link>
          </ListGroup>
        </Col>
      </Row>
      <div className="mt-lg" title="Some standard reactstrap components">
        <Row>
          <Col sm={6}>
            <div className="mt">
              <Button size="sm" color="default" className="mr-sm mb-xs">
                Default
              </Button>
              <Button size="sm" color="success" className="mr-sm mb-xs">
                + New
              </Button>
              <Button size="sm" color="info" className="mr-sm mb-xs">
                Info
              </Button>
              <Button size="sm" color="warning" className="mr-sm mb-xs">
                Warning
              </Button>
              <Button size="sm" color="danger" className="mb-xs">
                Danger
              </Button>
            </div>
            <ButtonGroup className="mb">
              <Button color="default">1</Button>
              <Button color="default">2</Button>
              <ButtonDropdown isOpen={isDropdownOpened} toggle={toggleDropdown}>
                <DropdownToggle color="default" caret>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>1</DropdownItem>
                  <DropdownItem>2</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            <p className="mb-0">
              For more components please checkout
              <a
                href="https://reactstrap.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                reactstrap documentation
              </a>
            </p>
          </Col>
          <Col sm={6}>
            <Progress className="progress-sm" color="success" value={40} />
            <Progress className="progress-sm" color="info" value={20} />
            <Progress className="progress-sm" color="warning" value={60} />
            <Progress className="progress-sm" color="danger" value={80} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Articles;
