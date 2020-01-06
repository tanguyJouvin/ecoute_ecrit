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

import './ModifBookBody.css';

function ModifBookBody(props) {
  const [listPartBook, setListPartBook] = useState([]);
  const [navPills, setNavPills] = useState(1);
  const [pillType, setPillType] = useState('');
  const [newInputText, setNewInputText] = useState('');
  const [reduxText, setReduxText] = useState('');

  const { index } = props;

  const { body } = props;

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setNavPills(index);
    setPillType(state);
  };

  const convertTypeToNumber = (type) => {
    if (type === 'Partie') {
      return 1;
    }
    if (type === 'Chapitre') {
      return 2;
    }
    if (type === 'Sous-chapitre') {
      return 3;
    }
    if (type === 'Texte') {
      return 4;
    }
    return toast.error('Erreur', errorToasterStyle);
  };

  const updateInputValue = () => {
    if (
      newInputText
      && newInputText.length > 0
    ) {
      const inputChangeValues = {
        edit: false,
        type: pillType,
        text: newInputText,
      };
      const newList = [...listPartBook];
      newList.splice(index, 1, inputChangeValues);
      setListPartBook(newList);
      setNewInputText('');
      props.dispatch(editBody(newList));
      props.dispatch(switchView('Bookbody'));
    } else {
      const inputChangeValues = {
        edit: false,
        type: pillType,
        text: body[index].text,
      };
      const newList = [...listPartBook];
      newList.splice(index, 1, inputChangeValues);
      setListPartBook(newList);
      setNewInputText('');
      props.dispatch(editBody(newList));
      props.dispatch(switchView('Bookbody'));
    }
  };

  const removeInput = () => {
    const newList = [...listPartBook];
    newList.splice(index, 1);
    setListPartBook(newList);
    props.dispatch(editBody(newList));
    props.dispatch(switchView('Bookbody'));
  };

  useEffect(() => {
    setListPartBook(body);
    setNavPills(index);
  }, []);

  useEffect(() => {
    setNavPills(convertTypeToNumber(body[index].type));
    setPillType(body[index].type);
  }, [body[index].type]);

  useEffect(() => {
    setReduxText(body[index].text);
  });

  const partConditionUp = body[index - 1] === undefined || body[index - 1].type === 'Texte' || body[index] === 'Partie';
  const partConditionDown = body[index + 1] === undefined || body[index + 1].type === 'Texte' || body[index + 1].type === 'Chapitre';
  const errorPart = () => {
    setPillType(null);
    toast.error('Vous ne pouvez pas insérer de "Partie"', errorToasterStyle);
  };

  const chapterConditionUp = body[index - 1] === undefined || body[index - 1].type === 'Texte' || body[index - 1].type === 'Partie' || body[index] === 'Chapitre';
  const chapterConditionDown = body[index + 1] === undefined || body[index + 1].type === 'Texte' || body[index + 1].type === 'Sous-chapitre';
  const errorChapter = () => {
    setPillType(null);
    toast.error('Vous ne pouvez pas insérer de "Chapitre"', errorToasterStyle);
  };

  const subChapterConditionUp = (index > 0 && body[index - 1].type === 'Texte') || (index > 0 && body[index - 1].type === 'Chapitre') || body[index] === 'Sous-chapitre';
  const subChapterConditionDown = body[index + 1] === undefined || body[index + 1].type === 'Texte';
  const errorSubChapter = () => {
    setPillType(null);
    toast.error('Vous ne pouvez pas insérer de "Sous-chapitre"', errorToasterStyle);
  };

  const TextConditionDown = body[index + 1] === undefined || body[index + 1].type !== 'Sous-chapitre' || body[index + 1].type === 'Texte' || body[index] === 'Texte';
  const errorText = () => {
    setPillType(null);
    toast.error('Vous ne pouvez pas insérer de "Texte"', errorToasterStyle);
  };

  const lastMin = body[index].type.toLowerCase()

  return (
    <div id="backgroundChap2">
      <div className="inputContainer">
        <div className="container">
          <p className="questionInput">
            Souhaitez-vous modifier votre {lastMin} ?
          </p>
          <div className="choice">
            <Nav
              className="nav-fill flex-column flex-sm-row mb-3"
              id="tabs-text"
              pills
              role="tablist"
            >
              <NavItem>
                {partConditionUp && partConditionDown
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
                {chapterConditionUp && chapterConditionDown
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
                {subChapterConditionUp && subChapterConditionDown
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
                {TextConditionDown
                  ? (
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
                  )
                  : (
                    <NavLink
                      className="desactive"
                      href="#"
                      role="tab"
                      onClick={errorText}
                    >
                      Texte
                    </NavLink>
                  )
                }
              </NavItem>
            </Nav>
          </div>
          <Input
            className="form-control-alternative input"
            placeholder="Contenu"
            type={pillType === 'Texte' ? 'textarea' : 'text'}
            style={pillType === 'Texte' ? { height: '200px' } : null}
            defaultValue={reduxText}
            Value={newInputText}
            onChange={e => setNewInputText(e.target.value)}
          />
          <div className="buttonLign">
            <Button
              onClick={() => updateInputValue(index, pillType)}
              className="pinkButton"
              role="link"
              tabIndex={0}
              onKeyDown={() => { }}
            >
              Enregistrer
            </Button>
            <Button
              onClick={() => removeInput(index)}
              className="pinkButton"
              role="button"
              onKeyDown={() => { }}
              tabIndex={0}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  body: state.body,
  index: state.index,
});

export default connect(mapStateToProps)(ModifBookBody);

ModifBookBody.propTypes = {
  dispatch: PropTypes.func,
  body: PropTypes.shape({
    edit: PropTypes.bool,
    type: PropTypes.string,
    text: PropTypes.string,
  }),
  index: PropTypes.number,
};

ModifBookBody.defaultProps = {
  dispatch: null,
  body: null,
  index: null,
};
