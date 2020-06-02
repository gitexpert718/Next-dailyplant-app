import { 
  Container, 
  Nav, 
  Image, 
  ListGroup, 
  Button, 
  Dropdown, 
  DropdownButton, 
  Navbar, 
  Col, 
  Row 
} from 'react-bootstrap';
import "./main.global.scss";
import Layout from "../components/layout";
import CategoriesController from "../controller/categories";
import PostsController from "../controller/posts";
import { useState } from 'react';

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

function FeaturedPostRender(props) {
  const featuredPost = props.featuredPost;
  if (featuredPost.length) {
    return (
      <Row className="justify-content-md-center">
        <Col className="align-me" sm={12} md={7} lg={6}>
          <Image id="featuredImage" src={`http://dcoders.rs:1337${featuredPost[0].thumbnail.url}`} thumbnail />
        </Col>
        <Col sm={12} md={5} lg={6}>
          <h3>{featuredPost[0].name}</h3>
          <p>{featuredPost[0].content}</p>
        </Col>
      </Row>
    )
  } else {
    return (
      <Row className="justify-content-md-center">
        <Col className="align-me" sm={12} md={7} lg={6}>
          <Image id="featuredImage" src="https://barrie360.com/wp-content/uploads/2019/02/missing-1-1.jpg" thumbnail />
        </Col>
        <Col sm={12} md={5} lg={6}>
          <h3>There is not featured post in this category.</h3>
          <p>Please come back later.</p>
        </Col>
      </Row>
    )
  }
}

export default function Home({ query, Categories, FeaturedPost, TopFive, LatestPosts }) {
  const [latestPosts, setLatestPosts] = useState(LatestPosts);
  const [page, setPage] = useState(1);
  const [droptitle, setDropTitle] = useState("Latest News");
  const handleSelect = (e) => {
    setDropTitle(e);
    if (e == "Top News") {
      const fetchPromise = fetch("http://dcoders.rs:1337/posts?_start=0&&_limit=10&&_sort=views:DESC");
      fetchPromise.then(response => {
        return response.json();
      }).then(topLatestPosts => {
        setLatestPosts(topLatestPosts);
      });   
    } else {
      setLatestPosts(LatestPosts);
    }
    console.log(e);
  }
  (latestPosts.length);
  const loadMorePosts = async () => {
    const newPage = page+1;
    setPage(newPage);
    const morePosts = await PostsController.latestPosts(query.category, query.sort, newPage);
    console.log(morePosts);
    if(!morePosts.length) {
      alert("There is not any post yet!");
      return;
    }
    await setLatestPosts([...latestPosts, ...morePosts]);
    latestPostsRender();
  }
  const firstCol = [];
  const secondCol = [];
  const latestPostsRender = () => {
    let left = true;
    for (const post of latestPosts) {
      if (left) {
        firstCol.push(post);
        left = false;
      } else {
        secondCol.push(post);
        left = true;
      }
    }
  }
  latestPostsRender();

  const SortDropdown = () => {
    return (
      <DropdownButton
        title={droptitle}
        id="dropdown-basic"
        variant="success"
        onSelect={handleSelect}
        key={droptitle}          
      >
        <Dropdown.Item eventKey="Latest News">Latest News</Dropdown.Item>
        <Dropdown.Item eventKey="Top News">Top News</Dropdown.Item>
      </DropdownButton>
    )
  }

  return (
    <div>
      <Layout>
        <Container id="secondNavbarContainer" fluid bg="success">
          <Container>
            <Navbar bg="success" variant="dark" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-md-center">
                <Nav id="secondNavbar">
                  <Nav.Link href="/">All</Nav.Link>
                  {Categories.map((e, index) => (
                    <Nav.Link href={`/${e.slug}`} key={index}>{e.name}</Nav.Link>
                  ))}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </Container>
        <br />
        <Container fluid id="allContent">
          <Row className="justify-content-sm-center sector-row" id="featuredPost">
            <Col lg={12} xl={8} >
              <Container>
                <FeaturedPostRender featuredPost={FeaturedPost} />
              </Container>
            </Col>
            <Col lg={12} xl={4}>
              <Container>
                <Row className="justify-content-md-center">
                  <Col id="topNewsCol" className="justify-content-md-center">
                    <h3 id="topNewsTitle">Top News</h3>
                    <ListGroup variant="flush" className="listGroupNews">
                      {TopFive.map((e, index) => (
                        <ListGroup.Item action key={index}><a href={`/${e.slug}`}>{`${e.name}`}</a></ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row className="sectorRow">
            <Col id="dropdownCol">
              <SortDropdown />
            </Col>
          </Row>
          <Row className="justify-content-sm-center sectorRow">
            <Col md={12} lg={6}>
              <Container>
                <ListGroup className="listGroupNews">
                  {firstCol.map((e, index) => (
                    <ListGroup.Item action key={index}><a href={`/${e.slug}`}>{e.name}</a></ListGroup.Item>
                  ))}
                </ListGroup>
              </Container>
            </Col>
            <Col md={12} lg={6}>
              <Container>
                <ListGroup className="listGroupNews">
                  {secondCol.map((e, index) => (
                    <ListGroup.Item action key={index}><a href={`/${e.slug}`}>{e.name}</a></ListGroup.Item>
                  ))}
                </ListGroup>
              </Container>
            </Col>
          </Row>
          <Row className="sectorRow">
            <Col id="dropdownCol">
              <Button onClick={loadMorePosts} variant="success">Show More</Button>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  )
}

Home.getInitialProps = async ({ query }) => {  
  const Categories = await CategoriesController.getCategories();
  const FeaturedPost = await PostsController.getFeaturedPost(null);
  const TopFive = await PostsController.getTopFive(null);
  const LatestPosts = await PostsController.latestPosts(null, null, 1);
  return { query, Categories, FeaturedPost, TopFive, LatestPosts }
}
