import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../../toasterConfig';
import { editPreface } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './Preface.css';

function Preface(props) {
  const [content, setContent] = useState('');
  const [navPills, setNavPills] = useState(1);
  const [type, setType] = useState('preface');
  const types = ['preface', 'prologue', 'foreword', 'preambule'];

  const validateNextStep = (text, state) => {
    const otherTypes = types.filter(item => item !== state);
    if (content.length > 0) {
      props.dispatch(editPreface({ content: text, type: state }));
      otherTypes.forEach(item => props.dispatch(editPreface({ content: '', type: item })));
      props.dispatch(switchView('Congrats2'));
    } else {
      toast.error('Merci de remplir le champ', errorToasterStyle);
    }
  };

  const removePreface = (state) => {
    setContent('');
    setNavPills(1);
    const otherTypes = types.filter(item => item !== state);
    if (content.length > 0) {
      props.dispatch(editPreface({ content: '', type: state }));
      otherTypes.forEach(item => props.dispatch(editPreface({ content: '', type: item })));
    } else {
      toast.error('Merci de remplir le champ', errorToasterStyle);
    }
  };

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setNavPills(index);
    setType(state);
  };

  const previousStep = () => {
    props.dispatch(switchView('Thanks'));
  };

  const ignoreStep = () => {
    props.dispatch(switchView('Congrats2'));
  };

  useEffect(() => {
    setContent(props.head.preface
      || props.head.prologue
      || props.head.foreword
      || props.head.preambule);
    if (props.head.preface.length > 0) {
      setNavPills(1);
    }
    if (props.head.prologue.length > 0) {
      setNavPills(2);
    }
    if (props.head.foreword.length > 0) {
      setNavPills(3);
    }
    if (props.head.preambule.length > 0) {
      setNavPills(4);
    }
  }, []);

  return (
    <div id="backgroundStep8">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Que souhaitez-vous insérer ?</p>
          <div className="choice">
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
                  onClick={e => toggleNavs(e, 'preface', 1)}
                  href="#"
                  role="tab"
                >
                  Préface
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={navPills === 2}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: navPills === 2,
                  })}
                  onClick={e => toggleNavs(e, 'prologue', 2)}
                  href="#"
                  role="tab"
                >
                  Prologue
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={navPills === 3}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: navPills === 3,
                  })}
                  onClick={e => toggleNavs(e, 'foreword', 3)}
                  href="#"
                  role="tab"
                >
                  Avant-propos
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={navPills === 4}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: navPills === 4,
                  })}
                  onClick={e => toggleNavs(e, 'preambule', 4)}
                  href="#"
                  role="tab"
                >
                  Préambule
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Input
            className="form-control-alternative input"
            placeholder="Contenu"
            type="textarea"
            style={{ height: '200px' }}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="buttonLign">
            <Button
              onClick={() => removePreface()}
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
              onClick={() => validateNextStep(content, type)}
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
              title="Remerciements"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
            <i className="fas fa-chevron-circle-right invalidButton" />
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

export default connect(mapStateToProps)(Preface);

Preface.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    preface: PropTypes.string,
    prologue: PropTypes.string,
    foreword: PropTypes.string,
    preambule: PropTypes.string,
  }),
};

Preface.defaultProps = {
  dispatch: null,
  head: null,
};
