import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import switchView from '../../Action/viewAction';
import './Congrats2.css';

function Congrats1(props) {
  const nextStep = () => {
    props.dispatch(switchView('Bookbody'));
  };

  return (
    <div className="blockCongrats">
      <p className="congratsWord">Bravo, vous avez terminé l&apos;étape 2 !</p>
      <div>
        <Button
          onClick={nextStep}
          className="congratsButton"
          type="button"
        >
          Passer à la suite
        </Button>
      </div>
      <div className="problemCongrats">
        <a
          href="mailto:nullepart@mozilla.org"
          className="problemCongrats"
        >
          Avez-vous besoin d&apos;aide ?
        </a>
      </div>
    </div>
  );
}

export default connect()(Congrats1);

Congrats1.propTypes = {
  dispatch: PropTypes.func,
};

Congrats1.defaultProps = {
  dispatch: null,
};
