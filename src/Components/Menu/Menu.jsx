import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  CardImg,
} from 'reactstrap';
import illusCorr from '../../pics/illusCorr.png';
import illusVideo from '../../pics/illusVideo.png';
import illusMep from '../../pics/illusMep.png';
import './Menu.css';

function Menu() {
  return (
    <div className="blockMenu">
      <h1 className="titleMenu">Que souhaitez-vous faire ?</h1>
      <Container>
        <Row className="cards">
          <Col lg="4">
            <Card body className="customCard">
              <CardImg
                className="imgcard"
                top
                width="100%"
                src={illusCorr}
              />
              <Button className="corrigerButton mt-4" type="button">
                Corriger mon livre
              </Button>
            </Card>
          </Col>
          <Col lg="4">
            <Card body className="customCard">
              <CardImg
                className="imgcard"
                top
                width="100%"
                src={illusVideo}
              />
              <Button className="videoButton mt-4" type="button">
                Voir la vidéo de présentation
              </Button>
            </Card>
          </Col>
          <Col lg="4">
            <Link to={`${process.env.PUBLIC_URL}/edit`}>
              <Card body className="customCard">
                <CardImg
                  className="imgcard"
                  top
                  width="100%"
                  src={illusMep}
                />
                <Button className="mepButton mt-4" type="button">
                  Faire la mise en page
                </Button>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
      <div className="problemMenu">
        <a
          href="mailto:nullepart@mozilla.org"
          className="problem"
        >
        Avez-vous besoin d&apos;aide ?
        </a>
      </div>
    </div>
  );
}

export default Menu;
