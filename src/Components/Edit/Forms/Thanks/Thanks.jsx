import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../../toasterConfig';
import { editThanks } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './Thanks.css';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Thanks(props) {
  const [thanks, setThanks] = useState('');
  const [position, setPosition] = useState('');
  const [navPills, setNavPills] = useState(1);

  useEffect(() => {
    setThanks(props.head.thanks.text);
    if (props.head.thanks.position === 'debut') {
      setNavPills(1);
    }
    if (props.head.thanks.position === 'fin') {
      setNavPills(2);
    }
  }, []);

  const validateNextStep = (content) => {
    if (content.length > 0) {
      props.dispatch(editThanks({ text: content, position }));
      props.dispatch(switchView('Preface'));
    } else {
      toast.error('Merci de remplir le champ', errorToasterStyle);
    }
  };

  const removeThanks = () => {
    setThanks('');
    setNavPills('');
    props.dispatch(editThanks({ text: '', position: '' }));
  };

  const nextStep = () => {
    props.dispatch(switchView('Preface'));
  };

  const previousStep = () => {
    props.dispatch(switchView('Quotes'));
  };

  const ignoreStep = () => {
    props.dispatch(switchView('Preface'));
  };

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setNavPills(index);
    setPosition(state);
  };

  return (
    <div id="backgroundStep7">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Avez-vous des remerciements à faire ?</p>
          <div className="choiceThanks">
            <Nav
              className="nav-fill flex-column flex-sm-row mb-3"
              id="tabs-text"
              pills
              role="tablist"
            >
              <NavItem>
                <NavLink
                  aria-selected={navPills === 1}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: navPills === 1,
                  })}
                  onClick={e => toggleNavs(e, 'debut', 1)}
                  href="#"
                  role="tab"
                >
                  Au début du livre
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={navPills === 2}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: navPills === 2,
                  })}
                  onClick={e => toggleNavs(e, 'fin', 2)}
                  href="#"
                  role="tab"
                >
                  à la fin du livre
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Input
            className="form-control-alternative input"
            placeholder="Remerciements"
            type="text"
            value={thanks}
            onChange={e => setThanks(e.target.value)}
          />
          <div className="buttonLign">
            <Button
              onClick={() => removeThanks()}
              className="pinkButton"
              type="button"
            >
              Supprimer
            </Button>
            <Button
              onClick={ignoreStep}
              className="pinkButton"
              type="button"
            >
              Ignorer
            </Button>
            <Button
              onClick={() => validateNextStep(thanks)}
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
              title="Citations"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
            <i
              className="fas fa-chevron-circle-right validButton"
              onClick={nextStep}
              title="Préface"
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

const mapStatetoprops = state => ({
  head: state.head,
});

export default connect(mapStatetoprops)(Thanks);

Thanks.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    thanks: PropTypes.shape({
      position: PropTypes.string,
      text: PropTypes.string,
    }),
  }),
};

Thanks.defaultProps = {
  dispatch: null,
  head: null,
};
