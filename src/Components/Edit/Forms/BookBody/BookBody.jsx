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
import editBody from '../../../../Action/bodyAction';
import switchView from '../../../../Action/viewAction';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './BookBody.css';

function BookBody(props) {
  const [listPartBook, setListPartBook] = useState([]);
  const [inputText, setInputText] = useState('');
  const [navPills, setNavPills] = useState(1);
  const [pillType, setPillType] = useState('Partie');

  const { body } = props;

  useEffect(() => {
    setListPartBook(props.body);
  }, []);

  useEffect(() => {
    if (listPartBook.length > 0) {
      props.dispatch(editBody(listPartBook));
    }
  }, [listPartBook]);

  const addPartBook = () => {
    if (inputText.length > 0 && pillType) {
      const partBook = {
        edit: false,
        type: pillType,
        text: inputText,
      };
      setListPartBook([...listPartBook, partBook]);
      setPillType('');
      setInputText('');
    }
    if (inputText.length === 0) {
      toast.error('Merci de remplir le champ', errorToasterStyle);
    }
    if (pillType === '') {
      toast.error('Merci de sélectionner votre type de champ', errorToasterStyle);
    }
  };

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setNavPills(index);
    setPillType(state);
  };

  const partCondition = body[body.length - 1] === undefined || body[body.length - 1].type === 'Texte';
  const errorPart = () => {
    setPillType(null);
    toast.error('Vous ne pouvez pas insérer de "Partie"', errorToasterStyle);
  };

  const chapterCondition = body[body.length - 1] === undefined || body[body.length - 1].type === 'Texte' || body[body.length - 1].type === 'Partie';
  const errorChapter = () => {
    setPillType(null);
    toast.error('Vous ne pouvez pas insérer de "Chapitre"', errorToasterStyle);
  };

  const subChapterCondition = (body.length > 0 && body[body.length - 1].type === 'Texte') || (body.length > 0 && body[body.length - 1].type === 'Chapitre');
  const errorSubChapter = () => {
    setPillType(null);
    toast.error('Vous ne pouvez pas insérer de "Sous-chapitre"', errorToasterStyle);
  };

  const error = () => {
    setPillType(null);
    toast.error('Merci de sélectionner votre type de champ', errorToasterStyle);
  };

  const checkAddPart = () => {
    let numPart = 0;
    let numChap = 0;
    if (body.length === 0) {
      return true;
    }
    if (body[body.length - 1].type === 'Texte' && body.length === 1) {
      return true;
    }
    if (body.length > 0) {
      for (let i = body.length; i > 0; i -= 1) {
        if (body[i - 1].type === 'Partie') {
          numPart += 1;
          for (let j = i; j <= body.length - 1; j += 1) {
            if (body[j].type === 'Chapitre') {
              numChap += 1;
              if (numChap >= 2) {
                return true;
              }
            }
            if (body[j].type === 'Texte' && body[j - 1].type === 'Partie') {
              return true;
            }
          }
          return false;
        }
      } return false;
    }
    return false;
  };

  const checkAddChap = () => {
    let numChap = 0;
    let numSubChap = 0;

    if (body.length === 0) {
      return true;
    }
    if (body[body.length - 1].type === 'Partie') {
      return true;
    }
    if (body[body.length - 1].type === 'Texte' && body.length === 1) {
      return true;
    }
    if (body[body.length - 1].type === 'Texte' && body[body.length - 2].type === 'Chapitre') {
      return true;
    }
    if (body[body.length - 1].type === 'Texte' && body[body.length - 2].type === 'Partie') {
      return true;
    }
    if (body.length > 0) {
      for (let i = body.length; i > 0; i -= 1) {
        if (body[i - 1].type === 'Chapitre') {
          numChap += 1;
          for (let j = i; j <= body.length - 1; j += 1) {
            if (body[j].type === 'Sous-chapitre') {
              numSubChap += 1;
              if (numSubChap >= 2) {
                return true;
              }
            }
          }
          return false;
        }
      } return false;
    }
    return false;
  };

  const viewPdf = () => {
    props.dispatch(switchView('ChoicePdf'));
  };

  return (
    <div id="backgroundChap">
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
                {checkAddPart() && checkAddChap() && partCondition
                  ? (
                    <NavLink
                      aria-selected={navPills === 1}
                      className={classnames('mb-sm-3 mb-md-0', {
                        active: navPills === 1,
                      })}
                      onClick={e => toggleNavs(e, 'Partie', 1)}
                      href="#"
                      role="tab"
                    >
                      Partie
                    </NavLink>
                  )
                  : (
                    <NavLink
                      className="desactive"
                      href="#"
                      role="tab"
                      onClick={errorPart}
                    >
                      Partie
                    </NavLink>
                  )
                }
              </NavItem>
              <NavItem>
                {checkAddChap() && chapterCondition
                  ? (
                    <NavLink
                      aria-selected={navPills === 2}
                      className={classnames('mb-sm-3 mb-md-0', {
                        active: navPills === 2,
                      })}
                      onClick={e => toggleNavs(e, 'Chapitre', 2)}
                      href="#"
                      role="tab"
                    >
                      Chapitre
                    </NavLink>
                  )
                  : (
                    <NavLink
                      className="desactive"
                      href="#"
                      role="tab"
                      onClick={errorChapter}
                    >
                      Chapitre
                    </NavLink>
                  )
                }
              </NavItem>
              <NavItem>
                {subChapterCondition
                  ? (
                    <NavLink
                      aria-selected={navPills === 3}
                      className={classnames('mb-sm-3 mb-md-0', {
                        active: navPills === 3,
                      })}
                      onClick={e => toggleNavs(e, 'Sous-chapitre', 3)}
                      href="#"
                      role="tab"
                    >
                      Sous-chapitre
                    </NavLink>
                  )
                  : (
                    <NavLink
                      className="desactive"
                      href="#"
                      role="tab"
                      onClick={errorSubChapter}
                    >
                      Sous-chapitre
                    </NavLink>
                  )
                }
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={navPills === 4}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: navPills === 4,
                  })}
                  onClick={e => toggleNavs(e, 'Texte', 4)}
                  href="#"
                  role="tab"
                >
                  Texte
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Input
            className="form-control-alternative input"
            placeholder="Contenu"
            type={pillType === 'Texte' ? 'textarea' : 'text'}
            style={pillType === 'Texte' ? { height: '200px' } : null}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <i
            className="fas fa-plus-circle plusButton"
            onClick={pillType != null ? () => addPartBook() : error}
            onKeyDown={() => { }}
            role="button"
            tabIndex={0}
          />
          <div className="buttonLign">
            <Button className="pinkButton">
              Terminer
            </Button>
            <Button className="pinkButton" onClick={viewPdf}>
              Générer le pdf
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  body: state.body,
});

export default connect(mapStateToProps)(BookBody);

BookBody.propTypes = {
  dispatch: PropTypes.func,
  body: PropTypes.shape({
    edit: PropTypes.bool,
    type: PropTypes.string,
    text: PropTypes.string,
  }),
};

BookBody.defaultProps = {
  dispatch: null,
  body: null,
};
