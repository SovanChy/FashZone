import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar.js";
import PostCard from "../../Components/Postcard.js";
import PostForm from "../../Components/PostForm.jsx";
import TrendSearchBar from "../../Components/TrendSearchBar.jsx";
import { useState } from "react";
import { useCollection } from "../../Hook/useCollection.js";

//css styling
import "./Newsfeed.scss";


export default function Newsfeed() {
  const [postForm, setPostForm] = useState(false)
  const [searchBar, setSearchBar] = useState(false)
  const {error, documents} = useCollection('users')
  //post form
  
  const Post = () => {
    setPostForm(true)
  }
  const Search = () => {
    setSearchBar(true)
  }
  return (
    <div className="no-padding-top">
      <Container fluid className="newsfeed-container">
        <Row className="h-100">
          <Col xs={2} md={2} lg={2} sm={2} className="sidebar-column">
            <Sidebar />
          </Col>
          <Col xs={7} md={7} lg={7} sm={7} className="feed-column">
            <div className="post-list">
              <PostCard />
            </div>
          </Col>
          <Col xs={3} md={2} lg={3} sm={2} className="button-column">
            <div className="sticky-wrapper">
              <Button variant="danger" className="post-button" onClick={Post}>Post</Button>
              <hr />
              <Button variant="danger" className="post-button" onClick={Search}>Search</Button>
              <hr/> 
              <div className="user-sidebar">
                <h2>Friends</h2>
                {error && <div>{error}</div>}
                {documents && (
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {documents.map(user => (
                      <div className="d-flex  align-items-center  mb-2" key={user.id}>
                        <div
                          className={user.online ? 'online-status ' : 'offline-status'}
                          style={{ flexShrink: 0 }}
                        ></div>
                        <img
                          src={user.photoURL}
                          alt="User Avatar"
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            objectFit: "cover"
                          }}
                        />
                        <span className="ms-2">{user.displayName}</span>

                      </div>
                    ))}
                  </div>
                )}
              </div>
              <PostForm
                show={postForm}
                onHide={() => setPostForm(false)}
              />
              <TrendSearchBar
                show={searchBar}
                onHide={() => setSearchBar(false)}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}