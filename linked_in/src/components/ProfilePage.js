import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Descriptions, Spin, Row, Col, Image } from 'antd';
import PostCreation from './PostCreation';

const link = 'http://localhost:5050';
const imageLink = 'http://192.168.0.107:9000/linkedinimages';

const ProfilePage = () => {

  const userID = localStorage.getItem('userID');
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.post(`${link}/users/getUserInfo`, { userID });

      console.log(response.data);

      setUserData(response.data);
    }

    fetchUserData();
  }, [userID]);

  if (!userData) {
    return (<Spin />);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: 150,
            height: 150,
            borderRadius: '100%',
            objectFit: 'cover',
            overflow: 'hidden',
          }}
          preview={false}
          width={200}
          src={`${imageLink}/${userData.image}`}
        />
      </div>
      
      <br />
      <br />
      <br />
      <br />
      
      <Row>
        <Col span={24}>
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Name" span={2}>{userData.name}</Descriptions.Item>
            <Descriptions.Item label="Age">{userData.age}</Descriptions.Item>
            <Descriptions.Item label="Email" span={2}>{userData.email}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <PostCreation />
      <br />
      {/* <br /> */}
    </>
  );
};

export default ProfilePage;
