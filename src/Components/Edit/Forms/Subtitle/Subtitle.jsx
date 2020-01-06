import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button } from 'reactstrap';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../../toasterConfig';
import { editSubtitle } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './Subtitle.css';

function Subtitle(props) {
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    setSubtitle(props.head.subtitle);
  }, []);

  const validateNextStep = (content) => {
    if (content.length > 0) {
      props.dispatch(editSubtitle(content));
      props.dispatch(switchView('OthersBooks'));
    } else {
      toast.error('Merci de remplir le champ', errorToasterStyle);
    }
  };

  const nextStep = () => {
    props.dispatch(switchView('OthersBooks'));
  };

  const previousStep = () => {
    props.dispatch(switchView('Title'));
  };

  const removeSubtitle = () => {
    const newSubtitle = '';
    setSubtitle(newSubtitle);
    props.dispatch(editSubtitle(newSubtitle));
  };

  return (
    <div id="backgroundStep3">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Quel est le sous-titre du livre ?</p>
          <Input
            className="form-control-alternative input"
            placeholder="Sous-titre du livre"
            type="text"
            value={subtitle}
            onChange={event => setSubtitle(event.target.value)}
          />
          <div className="buttonLign">
            <Button
              onClick={() => removeSubtitle()}
              className="pinkButton"
              type="button"
            >
              Supprimer
            </Button>
            <Button
              onClick={nextStep}
              className="pinkButton"
              type="button"
            >
              Ignorer
            </Button>
            <Button
              onClick={() => validateNextStep(subtitle)}
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
              title="Titre"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
            <i
              className="fas fa-chevron-circle-right validButton"
              onClick={nextStep}
              title="Autres livres"
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

const mapStateToprops = state => ({
  head: state.head,
});

export default connect(mapStateToprops)(Subtitle);

Subtitle.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    subtitle: PropTypes.string,
  }),
};

Subtitle.defaultProps = {
  dispatch: null,
  head: null,
};
