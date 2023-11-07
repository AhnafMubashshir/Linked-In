import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Avatar, Spin, Image } from 'antd';
import PostDescription from './PostDescription';
const { Meta } = Card;

const link = 'http://localhost:6003';
const imageLink = 'http://192.168.0.107:9000/linkedinimages';


const HomePage = () => {
  const token = localStorage.getItem('token');

  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    console.log("hello");
    fetch(`${link}/posts/getPosts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch home page data');
        }
        return response.json();
      })
      .then((data) => {
        setAllPosts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!allPosts) {
    return <Spin />;
  }

  return (
    <>
      {allPosts.map((post) => (
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
      ))}
    </>
  );
}

export default HomePage