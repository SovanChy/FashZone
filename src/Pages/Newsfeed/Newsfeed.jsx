import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar.js";
import PostCard from "../../Components/Postcard.js";
import PostForm from "../../Components/PostForm.jsx";
import TrendSearchBar from "../../Components/TrendSearchBar.jsx";
import { useState } from "react";

//css styling
import "./Newsfeed.scss";


export default function Newsfeed() {
  const [postForm, setPostForm] = useState(false)
  const [searchBar, setSearchBar] = useState(false)
  const Post = () => {
    setPostForm(true)
  }
  const Search = () => {
    setSearchBar(true)
  }
  return (
    <Container fluid className="newsfeed-container">
      <Row className="h-100">
        <Col xs={2} md={2} lg={2} className="sidebar-column">
          <Sidebar />
        </Col>
        <Col xs={7} md={7} lg={7} className="feed-column">
          <div className="post-list">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
          
        </Col>
        <Col xs={3} md={3} lg={3} className="button-column">
          <div className="sticky-wrapper">
            <Button variant="danger" className="post-button" onClick={Post}>Post</Button>
            <br/>
            <Button variant="danger" className="post-button" onClick={Search}>Search</Button>
          </div>


          <PostForm
        show={postForm}
        onHide={() => setPostForm(false)}
        />
        <TrendSearchBar 
        show={searchBar}
        onHide={() => setSearchBar(false)}
        />
        </Col>
      </Row>
    </Container>
  );
}