import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Avatar, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const link = 'http://localhost:5050';
const imageLink = 'http://192.168.0.107:9000/linkedinimages';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const link = 'http://localhost';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        fetch(`${link}/notifications/getNotifications`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch quiz data');
            }
            return response.json();
          })
          .then((data) => {
            setNotifications(data.notifications);
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [userID]);

  const handleNotificationClick = async (postID, notificationID) => {
    await axios.post(`${link}/notifications/setSeen`, { notificationID, userID });
    navigate(`/viewpost/${postID}`);
  };

  if (!notifications) {
    return <Spin />;
  }

  return (
    <>
      {notifications.map((notification) => {
        var seen = false;

        return (
          <React.Fragment key={notification._id}>
            {notification.recipients.map((user) => {
              if (user.user === userID) {
                console.log(user.seen);
                seen = user.seen;
              }
              return null; // Add this return statement
            })}

            <Card
              hoverable
              style={{
                width: 700,
                marginBottom: 40,
              }}
              key={notification._id}
              onClick={() => handleNotificationClick(notification.postID, notification._id)}
            >
              <Meta
                avatar={notification.creatorImage ?
                  <Avatar src={`${imageLink}/${notification.creatorImage}`} /> :
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                description={!seen ? <strong style={{ color: 'black', fontSize: 17 }}>{notification.message}</strong> : notification.message}
              />
            </Card>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default NotificationPage;
