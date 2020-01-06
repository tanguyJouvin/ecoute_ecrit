import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { errorToasterStyle } from '../../../../toasterConfig';
import 'react-toastify/dist/ReactToastify.css';
import { editTitle } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import './Title.css';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Title(props) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(props.head.title);
  }, []);

  const validateNextStep = (content) => {
    if (content.length > 0) {
      props.dispatch(editTitle(content));
      props.dispatch(switchView('Subtitle'));
    } else {
      toast.error('Merci de remplir le champ', errorToasterStyle);
    }
  };

  const previousStep = () => {
    props.dispatch(switchView('Author'));
  };

  const nextStep = () => {
    props.dispatch(switchView('Subtitle'));
  };

  return (
    <div id="backgroundStep2">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Quel est le titre de votre livre ?</p>
          <Input
            className="form-control-alternative input"
            placeholder="Titre du livre"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <div className="buttonLign1">
            <Button
              onClick={() => validateNextStep(title)}
              className="pinkButton"
              type="button"
            >
              Suivant
            </Button>
          </div>
          <div className="arrow">
            <i
              className="fas fa-chevron-circle-left validButton"
              onClick={previousStep}
              title="Auteur"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
            <i
              className="fas fa-chevron-circle-right validButton"
              onClick={nextStep}
              title="Sous-titre"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
          </div>
        </div>
        <div className="problem">
          <a
            href="mailto:nullepart@mozilla.org"
            className="problem"
          >
            Avez-vous besoin d&apos;aide ?
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  head: state.head,
});

export default connect(mapStateToProps)(Title);

Title.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    title: PropTypes.string,
  }),
};

Title.defaultProps = {
  dispatch: null,
  head: null,
};
