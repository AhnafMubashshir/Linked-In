import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Descriptions, Spin, Row, Col } from 'antd';
import PostCreation from './PostCreation';

const link = 'http://localhost:5050';

const ProfilePage = () => {

  const userID = localStorage.getItem('userID');
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.post(`${link}/users/getUserInfo`, { userID });

      setUserData(response.data);
    }

    fetchUserData();
  }, [userID]);

  if (!userData) {
    return (<Spin />);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Name" span={2}>{userData.name}</Descriptions.Item>
            <Descriptions.Item label="Age">{userData.age}</Descriptions.Item>
            <Descriptions.Item label="Email" span={2}>{userData.email}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <PostCreation />
    </>
  );
};

export default ProfilePage;
