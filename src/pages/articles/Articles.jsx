import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
  Table,
  Progress,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function Dashboard({ isFetching, posts }) {
  const router = useNavigate();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const addNew = () => {
    router("new");
  };
  const formatDate = (str) => {
    return str.replace(/,.*$/, "");
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
            <Table className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              {/* eslint-disable */}
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <a href="#">ottoto@example.com</a>
                  </td>
                  <td>
                    <Badge color="gray" className="text-gray-light" pill>
                      Pending
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>
                    <a href="#">fat.thor@example.com</a>
                  </td>
                  <td>
                    <Badge color="gray" className="text-gray-light" pill>
                      Unconfirmed
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>
                    <a href="#">larry@example.com</a>
                  </td>
                  <td>
                    <Badge color="gray" className="text-gray-light" pill>
                      New
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Peter</td>
                  <td>Horadnia</td>
                  <td>
                    <a href="#">peter@example.com</a>
                  </td>
                  <td>
                    <Badge color="gray" className="text-gray-light" pill>
                      Active
                    </Badge>
                  </td>
                </tr>
              </tbody>
              {/* eslint-enable */}
            </Table>
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

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Dashboard);
