import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 ">copyright &copy; Amel Ul Mulk</Col>
          <Col className="text-center py-3 ">For App Development Contact at 03478204948</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
