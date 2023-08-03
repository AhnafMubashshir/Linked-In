import axios from 'axios';
import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import Uploader from './Uploader';

const link = 'http://localhost:5050';

const PostCreation = () => {

  const userID = localStorage.getItem('userID');
  const [postValue, setPostValue] = useState();
  const { TextArea } = Input;
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([]);

  const onChange = (data) => {
    const fieldName = data.target.name;
    const fieldValue = data.target.value;

    setPostValue((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handlePostButtonClick = async () => {

    const allURL = [];
    fileList.forEach((file) => {
      allURL.push(file.response.url);
    })

    const response = await axios.post(`${link}/posts/createPost`, { postValue, userID, allURL });
    console.log(response);
    setPostValue({});
    navigate('/');
  };

  const handleFileListChange = (newFileList) => {
    setFileList(newFileList);
  };

  console.log("Post Creation component: ", fileList);


  return (
    <>
      <Row>
        <Col span={22} ><h1>What's on your mind?</h1></Col>
        <Col span={2}>
          <Button type="primary" onClick={handlePostButtonClick}>Post</Button>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col span={24}>
          <Uploader onFileListChange={handleFileListChange} totalImageToUpload={8}/>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col span={24}>
          <TextArea name='postBody' placeholder="Write what you want to..." allowClear onChange={onChange} />
        </Col>
      </Row>
    </>
  )
}

export default PostCreation