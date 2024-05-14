import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";
import Breadcrumb from "@/components/Breadcrumb";
import AdvancedTable from "@/components/Table";
import { fetchUsers, updateUser, createUser, deleteUser } from "@/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Confrim from "@/components/Comfirm";

const UserList = () => {
  const fetchData = async () => {
    dispatch(fetchUsers());
  };
  const isFetching = useSelector((state) => state.user.isFetching);
  const user = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [currentTag, setCurrentTag] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const onHide = () => {
    setModalShow(false);
    setCurrentTag({
      tag_name: "",
    });
  };
  const handleAdd = () => {
    setModalShow(true);
    setCurrentTag({
      tag_name: "",
    });
  };
  const onSubmit = async () => {
    if (!currentTag.tag_name) {
      return;
    }
    if (currentTag.id) {
      //update  tag
      await dispatch(updateUser(currentTag));
    } else {
      await dispatch(createUser(currentTag));
    }
    fetchData();
    onHide();
  };
  const handleDelete = (row) => {
    Confrim({
      title: "Are you sure you want to delete this tag?",
      message: "This action cannot revert",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await dispatch(deleteUser(row));
            await fetchData();
          },
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };
  const handleEdit = (row) => {
    setCurrentTag(row);
    setModalShow(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const headers = [
    { key: "displayname", alias: "昵称", width: "5%" },
    {
      key: "name",
      alias: "用户名",
      width: "15%",
    },
    {
      key: "email",
      alias: "邮箱",
      width: "15%",
    },
    {
      key: "last_login",
      alias: "用户名",
      width: "15%",
    },

    {
      key: "operation",
      alias: "操作",
      width: "10%",
      render: (value, row) => {
        return (
          <div key={row.id} className="button-group">
            <Button
              color="primary"
              onClick={() => handleEdit(row)}
              className="btn-sm mr-1"
            >
              编辑
            </Button>
            <Button
              color="danger"
              onClick={() => handleDelete(row)}
              className="btn-sm"
              type="button"
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h1 className="page-title">User List</h1>
        <Button color="info" size="xs" onClick={() => handleAdd()}>
          + Add User
        </Button>
      </div>
      <Modal
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={modalShow}
        toggle={onHide}
        backdrop="static"
      >
        <ModalHeader toggle={onHide}>Edit Tag</ModalHeader>
        <ModalBody>
          <h4>Tag Name</h4>
          <div>
            <Input
              value={currentTag.tag_name}
              onChange={({ target }) => {
                setCurrentTag({
                  ...currentTag,
                  tag_name: target.value,
                });
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>
            Submit
          </Button>
          <Button onClick={onHide}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Col md={12} sm={24} xs={24}>
          <div>
            <AdvancedTable
              headers={headers}
              data={user}
              isFetching={isFetching}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserList;
