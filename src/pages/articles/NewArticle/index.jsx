import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Widget from "@/components/Widget/Widget";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@/components/Editor/Editor";

import Breadcrumb from "@/components/Breadcrumb";
import PlaygroundNodes from "@/components/Editor/nodes/PlaygroundNodes";
import { useSettings } from "@/components/Editor/context/SettingsContext";
import PlaygroundEditorTheme from "@/components/Editor/themes/PlaygroundEditorTheme";
import {
  createArticle,
  fetchArticles,
  updateArticle,
} from "@/actions/articles";
import { fetchTags } from "@/actions/tags";
import { useEffect, useRef } from "react";
import TagSelect from "@/components/TagSelect";

function NewArticle() {
  let { id } = useParams();
  const isFetching = useSelector((state) => state.articles.isFetching);
  const tags = useSelector((state) =>
    state.tags.tags.map((i) => ({ value: i.id, text: i.tag_name }))
  );
  const dispatch = useDispatch();

  // const posts = useSelector(state => state.articles.posts);
  const navigate = useNavigate(); // 使用 useNavigate 钩子函数
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: "",
      tags: [],
      content: "",
    },
  });

  async function fetchData() {
    if (id) {
      const res = await dispatch(fetchArticles(id));
      setValue("title", res.title);
      setValue("content", res.content);
      setValue(
        "tags",
        res.tags.map((i) => Number(i))
      );
      setTimeout(() => {
        editorRef?.current?.refreshEditor();
      }, 100);
    }
  }
  useEffect(() => {
    fetchData();
    dispatch(fetchTags());
  }, []);
  const onCancel = () => {
    navigate("/app/articles"); // 返回上一页
  };

  const onPublish = (data) => {
    console.log("Publish:", data);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const baseData = {
      ...data,
      draft: true,
      summary: "",
      images: [],
    };
    if (id) {
      await updateArticle({
        id,
        ...baseData,
      });
    } else {
      await dispatch(createArticle(baseData));
    }
    onCancel();
  };
  const {
    settings: { emptyEditor },
  } = useSettings();
  const editorRef = useRef();
  const initialConfig = {
    editorState: emptyEditor,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };
  return (
    <div>
      <Breadcrumb />
      <Widget>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup row>
            <Label for="title" sm={2}>
              Article Title
            </Label>
            <Col sm={4} className="relative">
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="title"
                    name="title"
                    invalid={errors.title}
                    placeholder="Enter Title"
                    type="text"
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback className="" tooltip>
                  {errors.title.message}
                </FormFeedback>
              )}
            </Col>
            <Label for="title" sm={2}>
              Article Tag
            </Label>
            <Col sm={4} className="relative">
              <Controller
                name="tags"
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field }) => (
                  <TagSelect
                    id="tag"
                    name="tags"
                    options={tags}
                    invalid={errors.tags}
                    placeholder="Enter Title"
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback className="" tooltip>
                  {errors.title.message}
                </FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="content" sm={2}>
              Article Contents
            </Label>
            <Col className="bg-white relative editor_container">
              <LexicalComposer initialConfig={initialConfig}>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Editor {...field} ref={editorRef} name="content" />
                  )}
                />
              </LexicalComposer>
              {errors.content && (
                <FormFeedback>This field is required</FormFeedback>
              )}
            </Col>
            <div></div>
          </FormGroup>
          <div className="flex justify-end">
            <Button
              type="submit" // 设置按钮类型为 submit
              size="sm"
              color="warning"
              disabled={isFetching}
              className="mr-sm mb-xs"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
            <Button
              type="submit" // 设置按钮类型为 submit
              size="sm"
              color="success"
              disabled={isFetching}
              className="mr-sm mb-xs"
              onClick={handleSubmit(onPublish)}
            >
              Publish
            </Button>
            <Button
              onClick={onCancel}
              size="sm"
              color="info"
              disabled={isFetching}
              className="mr-sm mb-xs"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Widget>
    </div>
  );
}

export default NewArticle;
