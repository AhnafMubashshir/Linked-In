import axios from 'axios';
import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const link = 'http://localhost:5050';

const PostCreation = ({onPosCreated}) => {

  const userID = localStorage.getItem('userID');
  const [postValue, setPostValue] = useState();
  const { TextArea } = Input;
  const navigate = useNavigate();

  const onChange = (data) => {
    const fieldName = data.target.name;
    const fieldValue = data.target.value;

    setPostValue((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handlePostButtonClick = async () => {
    const response = await axios.post(`${link}/posts/createPost`, { postValue, userID});
    console.log(response);
    setPostValue({});
    navigate('/');
    onPosCreated();
  };

  return (
    <>
    <Row>
        <Col span={22} ><h1>What's on your mind?</h1></Col>
        <Col span={2}>
          <Button type="primary" onClick={handlePostButtonClick}>Post</Button>
        </Col>
      </Row>
      <br/>
      <br/>
      <Row>
        <Col span={24}>
          <Input name='postTitle' placeholder="input with clear icon" allowClear onChange={onChange} />
        </Col>
      </Row>
      <br/>
      <br/>
      <Row>
        <Col span={24}>
          <TextArea name='postBody' placeholder="textarea with clear icon" allowClear onChange={onChange} />
        </Col>
      </Row>
    </>
  )
}

export default PostCreation