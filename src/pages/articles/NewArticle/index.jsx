import { useState } from "react";
import { connect } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
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
import { useNavigate } from "react-router-dom";
import Editor from "@/components/Editor/Editor";

import PlaygroundNodes from "@/components/Editor/nodes/PlaygroundNodes";
import { useSettings } from "@/components/Editor/context/SettingsContext";
import PlaygroundEditorTheme from "@/components/Editor/themes/PlaygroundEditorTheme";

function Dashboard({ isFetching, posts }) {
  const navigate = useNavigate(); // 使用 useNavigate 钩子函数
  const [html, setHtml] = useState("");
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      title: "",
      content: ""
    }
  }); // 初始化 useForm
  const formatDate = (str) => {
    return str.replace(/,.*$/, "");
  };

  const onCancel = () => {
    navigate("/app/articles"); // 返回上一页
  };
  const onChange = (state) => {
    console.log(setHtml(state));
  };

  const onPublish = (data) => {
    console.log("Publish:", data);
  };
  
  const onSubmit = (state) => {
    handleSubmit()
    console.log(setHtml(state));
  };
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();
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
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Articles</BreadcrumbItem>
      </Breadcrumb>
      <Widget>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup row>
            <Label for="title" sm={1}>
              Article Title
            </Label>
            <Col sm={11} className="relative">
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
                    invalid ={errors.title}
                    placeholder="Enter Title"
                    type="text"
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback className="" tooltip>{errors.title.message}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="content" sm={1}>
              Article Contents
            </Label>
            <Col className="bg-white relative editor_container">
              <LexicalComposer initialConfig={initialConfig}>
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Editor
                      onChange={(state) => {
                        setHtml(state);
                        field.onChange(state);
                      }}
                    />
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
              className="mr-sm mb-xs"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
            <Button
              type="submit" // 设置按钮类型为 submit
              size="sm"
              color="success"
              className="mr-sm mb-xs"
              onClick={handleSubmit(onPublish)} 
            >
              Publish
            </Button>
            <Button
              onClick={onCancel}
              size="sm"
              color="info"
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

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Dashboard);
