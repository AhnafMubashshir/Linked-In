import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const { Meta } = Card;

const link = 'http://localhost:5050';

const CustomPostViewerPage = () => {
    const { postID } = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.post(`${link}/posts/getPostInfo`, { postID });

            console.log(response);

            setPost(response.data);
          }
      
          fetchUserData();
    }, [postID]);

    if (!post) {
        return <Spin />;
    }

    return (
        <Card
            style={{
                width: post.img ? 500: 800,
            }}
            cover={post.img ? <img alt="example" src={post.img} /> : null}
        >
            <Meta title={post.title} description={post.body} />
        </Card>
    );
}

export default CustomPostViewerPage;