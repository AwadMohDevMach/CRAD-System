import React from 'react'
import {
    Container,
    Row,
    Col,
    Button
  } from "react-bootstrap";
  import { useRouteError ,useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    const navigate = useNavigate();

  return (
    <Container>
    <Row>
      <Col xs={{ span: 8, offset: 2 }}>
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Button onClick={() => navigate("/" , {replace : "/"})} variant="link">Link</Button>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default ErrorPage
