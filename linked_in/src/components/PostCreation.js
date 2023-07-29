import axios from 'axios';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Button, Row, Col, Modal, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';

const link = 'http://localhost:5050';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PostCreation = () => {

  const userID = localStorage.getItem('userID');
  const [postValue, setPostValue] = useState();
  const { TextArea } = Input;
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

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
          <Upload
            action={`${link}/upload/uploadImage`}
            listType="picture-circle"
            name='image'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>
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