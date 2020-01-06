import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../../toasterConfig';
import { editAuthor } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './Author.css';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Author(props) {
  const [author, setAuthor] = useState('');

  useEffect(() => {
    setAuthor(props.head.author);
  }, []);

  const validateNextStep = (content) => {
    if (content.length > 0) {
      props.dispatch(editAuthor(content));
      props.dispatch(switchView('Title'));
    } else {
      toast.error('Merci de remplir le champ', errorToasterStyle);
    }
  };

  const nextStep = () => {
    props.dispatch(switchView('Title'));
  };

  return (
    <div id="backgroundStep1">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Quel est votre nom d&apos;auteur ?</p>
          <Input
            className="form-control-alternative input"
            placeholder="Nom d'auteur"
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
          <div className="buttonLign1">
            <Button
              onClick={() => validateNextStep(author)}
              className="pinkButton"
              type="button"
            >
              Suivant
            </Button>
          </div>
          <div className="arrow">
            <i className="fas fa-chevron-circle-left invalidButton" />
            <i
              className="fas fa-chevron-circle-right validButton"
              onClick={nextStep}
              title="Titre"
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

export default connect(mapStateToProps)(Author);

Author.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    author: PropTypes.string,
  }),
};

Author.defaultProps = {
  dispatch: null,
  head: null,
};
