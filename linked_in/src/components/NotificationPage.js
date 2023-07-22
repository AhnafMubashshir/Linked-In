import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Avatar, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const link = 'http://localhost:5050';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const userID = localStorage.getItem('userID');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.post(`${link}/notifications/getNotifications`, { userID });
                setNotifications(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNotifications();
    }, [userID]);

    const handleNotificationClick = async (postID, notificationID) => {
        await axios.post(`${link}/notifications/setSeen`, { notificationID, userID });

        navigate(`/viewpost/${postID}`);
    }

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
                        })}

                        <Card
                            hoverable
                            style={{
                                width: 700,
                                marginBottom: 40
                            }}
                            key={notification._id}
                            onClick={() => handleNotificationClick(notification.postID, notification._id)}
                        >
                            <Meta
                                avatar={notification.userIMG ?
                                    <Avatar src={notification.userIMG} /> :
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                }
                                title= {seen? '' : notification.message}
                                description={seen ? notification.message : ''}
                            />
                        </Card>
                    </React.Fragment>
                );
            })}
        </>
    )
}

export default NotificationPage

