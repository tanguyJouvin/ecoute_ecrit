import React from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  CardImg,
} from 'reactstrap';
import './ChoicePdf.css';
import GeneratePdfA5 from '../GeneratePdf/GeneratePdfA5';
import GeneratePdfPoche from '../GeneratePdf/GeneratePdfPoche';
import A5 from '../../pics/A5.png';
import poche from '../../pics/poche.png';

function Menu() {
  return (
    <div className="blockMenu">
      <h1 className="titleMenu">Quel format souhaitez-vous ?</h1>
      <Container>
        <Row className="cards">
          <Col lg="6">
            <Card body className="customCard">
              <CardImg
                className="imgcard"
                top
                width="100%"
                src={A5}
              />
              <GeneratePdfA5 />
            </Card>
          </Col>
          <Col lg="6">
            <Card body className="customCard">
              <CardImg
                className="imgcard"
                top
                width="100%"
                src={poche}
              />
              <GeneratePdfPoche />
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="problemMenu">
        <a href="mailto:nullepart@mozilla.org" className="problem">Vous rencontrez des problèmes ?</a>
      </div>
    </div>
  );
}

export default Menu;
