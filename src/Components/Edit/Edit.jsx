import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
import Sidebar from './Sidebar/Sidebar';
import Forms from './Forms/Forms';
import './Edit.css';

function Edit() {
  return (
    <div className="Edit">
      <Row className="no-margin">
        <Col lg="3" xs="4" className="col-background-sidebar no-padding no-margin">
          <Sidebar className="Sidebar" />
        </Col>
        <Col lg="9" xs="8" className="col-background-editor no-padding no-padding">
          <Forms className="Forms" />
        </Col>
      </Row>
    </div>
  );
}

export default Edit;
