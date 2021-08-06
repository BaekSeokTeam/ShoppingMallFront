import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Tab, Row, Col, Card, Pagination, Button } from "react-bootstrap";
import axios from "axios";

const PaginationBar = ({ postsPerPage, totalPosts, paginate, current }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <Pagination className="d-flex justify-content-center">
      {pageNumber.map((pageNum) => (
        <Pagination.Item
          key={pageNum}
          active={pageNum === current}
          onClick={() => paginate(pageNum)}
        >
          {pageNum}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul className="list">
      {posts.map((post) => (
        <EachCard key={post._id} item={post}></EachCard>
      ))}
    </ul>
  );
};
function EachCard(props) {
  const [item, setitem] = useState({
    _id: "",
    name: "",
    price: "",
    imgURL: "holder.js/100px180",
  });
  useEffect(() => {
    const getItem = async () => {
      const param = {
        item: props.item._id,
      };
      const gettedItem = await axios.get("api/item/get", { params: param });
      setitem(gettedItem.data.item);
    };
    getItem();
  }, [props]);
  return (
    <Card bg="primary" text="light" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.imgURL[0]} />
      <Card.Body>
        <Card.Link
          style={{ color: "#FFF" }}
          text="light"
          href={`/item?id=${item._id}`}
        >
          {item.name}
        </Card.Link>
        <Card.Text>{item.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function ItemList(props) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const [items, setitems] = useState([]);
  useEffect(() => {
    setLoading(true);
    setitems(props.items);
    setLoading(false);
  }, [props]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <Posts posts={currentPosts} loading={loading} />
      <PaginationBar
        postsPerPage={postsPerPage}
        totalPosts={items.length}
        paginate={paginate}
        current={currentPage}
      />
    </div>
  );
}

function ItemListPage(props) {
  const [shirt, setshirt] = useState([]);
  const [pants, setpants] = useState([]);
  useEffect(() => {
    const getAllItems = async () => {
      const items = await axios.get("api/item/viewAll");
      var shirtTemp = [];
      var pantsTemp = [];

      for (var i = 0; i < items.data.length; i++) {
        if (items.data[i].Tag[0] === "shirt") {
          shirtTemp.push(items.data[i]);
        } else if (items.data[i].Tag[0] === "pants") {
          pantsTemp.push(items.data[i]);
        } else {
        }
      }
      setshirt(shirtTemp);
      setpants(pantsTemp);
    };
    getAllItems();
  }, []);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="shirt">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="shirt">상의</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pant">하의</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="shirt">
              <ItemList items={shirt} />
            </Tab.Pane>
            <Tab.Pane eventKey="pant">
              <ItemList items={pants} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
      {props.admin ? (
        <Button
          variant="secondary"
          onClick={() => {
            props.history.push("/itemadd");
          }}
        >
          아이템 추가
        </Button>
      ) : null}
    </Tab.Container>
  );
}

export default withRouter(ItemListPage);
