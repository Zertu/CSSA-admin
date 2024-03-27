import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import { useNavigate  } from 'react-router-dom';
import Editor from '@/components/Editor/Editor';

import PlaygroundNodes from '@/components/Editor/nodes/PlaygroundNodes';
import { useSettings} from '@/components/Editor/context/SettingsContext';
import PlaygroundEditorTheme from '@/components/Editor/themes/PlaygroundEditorTheme';

function Dashboard({ isFetching, posts }) {

const router = useNavigate();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const formatDate = (str) => {
    return str.replace(/,.*$/,"");
  }

  const toggleDropdown = () => {
    setIsDropdownOpened(prevState => !prevState);
  }
  
  const {
    settings: {isCollab, emptyEditor, measureTypingPerf},
  } = useSettings();
  const initialConfig = {
    editorState: emptyEditor,
    namespace: 'Playground',
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
      
      <div className="bg-white relative editor">
      <LexicalComposer initialConfig={initialConfig}>
      <Editor></Editor>
      </LexicalComposer>
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