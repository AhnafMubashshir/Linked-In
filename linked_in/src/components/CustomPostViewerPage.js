import React, { useEffect, useState } from 'react';
import { Card, Spin, Image, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDescription from './PostDescription';
const { Meta } = Card;

const link = 'http://localhost';
const imageLink = "http://192.168.0.107:9000/linkedinimages";

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
            key={post._id} // Add a unique key to the Card component
            style={{
                width: 800,
                marginBottom: 40
            }}
        >
            <Meta
                avatar={
                    post.userImage ? (
                        <Avatar src={`${imageLink}/${post.userImage}`} style={{ width: '50px', height: '50px' }} />
                    ) : (
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" style={{ width: '50px', height: '50px' }} />
                    )
                }
                title={post.creator}
                description={
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                }
            />

            <br />
            <br />

            <p>
                {<PostDescription fullDescription={post.body} />}
            </p>

            <br />
            <br />
            <br />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    {post.images.map((image) => (
                        <Image src={`${imageLink}/${image}`} alt="Image" width={550} />

                    ))}
                </Image.PreviewGroup>
            </div>
        </Card>
    );
}

export default CustomPostViewerPage;