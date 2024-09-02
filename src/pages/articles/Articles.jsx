import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Breadcrumb from "@/components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { fetchArticles, deleteArticle } from "../../actions/articles";
import AdvancedTable from "@/components/Table";
import { fetchTags } from "@/actions/tags";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
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
  const handleDelete = async (row) => {
    await deleteArticle(row.id);
    dispatch(fetchArticles());
  };

  const headers = [
    { field: "id", headerName: "文章ID", width: 170 },
    { field: "title", headerName: "标题", width: 230 },
    {
      field: "tags",
      headerName: "标签",
      width: 230,
      valueGetter: (_, value) => {
        return value.tags
          .map((tag) => tags.find((i) => i.id === tag)?.tag_name)
          .join(", ");
      },
    },
    {
      field: "draft",
      headerName: "草稿状态",
      width: 150,
      valueGetter: (_, value) => (value.draft ? "是" : "否"),
    },
    { field: "summary", headerName: "摘要", width: 230 },
    {
      field: "authors",
      headerName: "作者",
      width: 150,
      valueGetter: (params, value) => {
        return value.authors.join(", ");
      },
    },
    {
      field: "created_at",
      headerName: "创建时间",
      width: 150,
      valueFormatter: (params, value) =>
        new Date(value.created_at).toLocaleDateString(),
    },
    {
      field: "updated_at",
      headerName: "更新时间",
      width: 150,
      valueGetter: (params, value) =>
        new Date(value.updated_at).toLocaleDateString(),
    },
    {
      field: "operation",
      headerName: "操作",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            size="small"
            color="primary"
            href={`/app/articles/edit/${params?.row.id}`}
          >
            编辑
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleDelete(params?.row)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  const addNew = () => {
    router("new");
  };

  return (
    <div>
      <Breadcrumb />
      <Grid>
        <Typography variant="h3" gutterBottom>
          Articles
        </Typography>
        <Grid item sm={1} align-self="left">
          <div className="mb flex justify-end">
            <Button
              onClick={addNew}
              size="small"
              color="success"
              variant="contained"
            >
              +&nbsp;New
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid>
        <Grid item>
          <div className="table-responsive" style={{ backgroundColor: "#fff" }}>
            <AdvancedTable
              headers={headers}
              data={articles}
              isFetching={isFetching}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Articles;
