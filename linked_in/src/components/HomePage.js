import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Avatar, Spin } from 'antd';
const { Meta } = Card;

const link = 'http://localhost:5050';

const HomePage = () => {

  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${link}/posts/getPosts`);
      setAllPosts(response.data);
    };

    fetchData();
  }, []);

  if (!allPosts) {
    return <Spin />;
  }

  return (
    <>
      {allPosts.map((post) => (
        <Card
          style={{
            width: 800,
            marginBottom: 40
          }}
          cover={post.img ? <img alt="example" src={post.img} /> : null}
        >
          <Meta
            avatar={post.userIMG ?
              <Avatar src={post.userIMG} /> :
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"/>
            }
            title={post.title}
            description={post.body}
          />
        </Card>
      ))}
    </>
  );
}

export default HomePage