import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  DialogContentText,
  TextField,
  Box,
} from "@mui/material";
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
          <Box sx={{ "& button": { m: 1 } }} key={row.id}>
            <div id="popup-root" className="button-group">
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() => handleEdit(row)}
              >
                重置密码
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleEdit(row)}
              >
                编辑
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(row)}
              >
                删除
              </Button>
            </div>
          </Box>
        );
      },
    },
  ];
  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h1 className="page-title">User List</h1>
        <Button variant="contained" onClick={() => handleAdd()}>
          + Add User
        </Button>
      </div>
      <Dialog keyboard={false} size="lg" open={modalShow} onClose={onHide}>
        <DialogTitle>Edit account</DialogTitle>
        <DialogContent>
          <DialogContentText>Tag Name</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          {/* <div>
            <Input
              value={currentTag.tag_name}
              onChange={({ target }) => {
                setCurrentTag({
                  ...currentTag,
                  tag_name: target.value,
                });
              }}
            />
          </div> */}
        </DialogContent>

        <DialogActions>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
          <Button onClick={onHide}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item sm={24}>
          <div>
            <AdvancedTable
              headers={headers}
              data={user}
              isFetching={isFetching}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserList;
