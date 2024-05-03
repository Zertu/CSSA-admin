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
import { fetchTags, updateTag, createTag, deleteTag } from "@/actions/tags";
import { useDispatch, useSelector } from "react-redux";
import Confrim from "@/components/Comfirm";

const TagList = () => {
  const fetchData = async () => {
    dispatch(fetchTags());
  };
  const isFetching = useSelector((state) => state.tags.isFetching);
  const tags = useSelector((state) => state.tags.tags);
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
      await dispatch(updateTag(currentTag));
    } else {
      await dispatch(createTag(currentTag));
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
            await dispatch(deleteTag(row));
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
    { key: "id", alias: "文章ID", width: "5%" },
    {
      key: "tag_name",
      alias: "标签",
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
        <h1 className="page-title">Tags List</h1>
        <Button color="info" size="xs" onClick={() => handleAdd()}>
          + Add Tag
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
              data={tags}
              isFetching={isFetching}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TagList;
