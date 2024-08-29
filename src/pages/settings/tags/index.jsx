import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2"; // Grid version 2
import Button from "@mui/material/Button";
import Breadcrumb from "@/components/Breadcrumb";
import AdvancedTable from "@/components/Table";
import { fetchTags, updateTag, createTag, deleteTag } from "@/actions/tags";
import { useDispatch, useSelector } from "react-redux";
import Confrim from "@/components/Comfirm";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
    { field: "tag_name", headerName: "标签", width: 230 },
    { field: "tag_count", headerName: "标签数量", width: 150 },
    {
      field: "operation",
      headerName: "操作",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleEdit(params.row)}
            size="small"
          >
            编辑
          </Button>
          <Button
            onClick={() => handleDelete(params.row)}
            size="small"
            variant="outlined"
            color="error"
            style={{ marginLeft: 8 }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h1 className="page-title">Tags List</h1>
        <Button color="info" size="xs" variant="contained" onClick={handleAdd}>
          + Add Tag
        </Button>
      </div>
      <Dialog
        open={modalShow}
        onClose={onHide}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            onHide();
          },
        }}
      >
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>Please input new tag Name</DialogContentText>
          <TextField
            autoFocus
            required
            value={currentTag.tag_name}
            onChange={({ target }) => {
              setCurrentTag({
                ...currentTag,
                tag_name: target.value,
              });
            }}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onHide}>Cancel</Button>
          <Button type="submit" onClick={onSubmit}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Modal
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
      </Modal> */}

      <Grid>
        <div className="table-responsive" style={{ backgroundColor: "#fff" }}>
          <AdvancedTable
            headers={headers}
            data={tags}
            isFetching={isFetching}
          />
        </div>
      </Grid>
    </div>
  );
};

export default TagList;
