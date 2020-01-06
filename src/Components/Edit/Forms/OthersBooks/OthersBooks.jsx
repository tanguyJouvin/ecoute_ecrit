import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button } from 'reactstrap';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../../toasterConfig';
import { editOtherbooks } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import editPic from '../../../../pics/edit.png';
import removePic from '../../../../pics/remove.png';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './OthersBooks.css';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function OthersBooks(props) {
  const [listBooks, setListBooks] = useState([]);
  const [inputBook, setInputBook] = useState('');
  const [inputEdition, setInputEdition] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [inputChangeBook, setInputChangeBook] = useState('');
  const [inputChangeEdition, setInputChangeEdition] = useState('');
  const [inputChangeYear, setInputChangeYear] = useState('');
  const [inputStatusUpdate, setInputStatusUpdate] = useState(false);

  useEffect(() => {
    setListBooks(props.head.otherBooks);
  }, []);

  const addBook = () => {
    if (
      inputBook
      && inputBook.length > 0
      && inputEdition
      && inputEdition.length > 0
      && inputYear
      && inputYear.length === 4
      && listBooks.length < 10
    ) {
      const inputBookEditionYear = {
        edit: false,
        book: inputBook,
        edition: inputEdition,
        year: inputYear,
      };
      setInputBook('');
      setInputEdition('');
      setInputYear('');
      setListBooks([...listBooks, inputBookEditionYear]);
    } else if (
      setInputBook.length > 0
      && setInputEdition.length > 0
      && setInputYear.length === 4
      && listBooks.length < 10
    ) {
      toast.error('Cliquez sur + avant de valider !', errorToasterStyle);
    } else if (
      inputBook.length === 0
      && inputEdition.length === 0
      && inputYear.length === 0
    ) {
      toast.error('Merci de remplir le champ !', errorToasterStyle);
    } else {
      toast.error('Vous pouvez ajouter 10 livres maximum !', errorToasterStyle);
    }
  };

  const inputEdit = (index) => {
    const newList = [...listBooks];
    newList[index].edit = true;
    setInputStatusUpdate(true);
    setListBooks(newList);
  };

  const updateInputValue = (index) => {
    setInputStatusUpdate(false);
    if (
      inputChangeBook
      && inputChangeBook.length > 0
      && inputChangeEdition
      && inputChangeEdition.length > 0
      && inputChangeYear
      && inputChangeYear.length > 0
    ) {
      const inputChangeValues = {
        edit: false,
        book: inputChangeBook,
        edition: inputChangeEdition,
        year: inputChangeYear,
      };
      const newList = [...listBooks];
      newList[index].edit = false;
      newList.splice(index, 1, inputChangeValues);
      setListBooks(newList);
      setInputChangeBook('');
      setInputChangeEdition('');
      setInputChangeYear('');
    } else if (inputChangeBook && inputChangeBook.length > 0) {
      const inputChangeValues = {
        edit: false,
        book: inputChangeBook,
        edition: listBooks[index].edition,
        year: listBooks[index].year,
      };
      const newList = [...listBooks];
      newList[index].edit = false;
      newList.splice(index, 1, inputChangeValues);
      setListBooks(newList);
      setInputChangeBook('');
      setInputChangeEdition('');
      setInputChangeYear('');
    } else if (inputChangeEdition && inputChangeEdition.length > 0) {
      const inputChangeValues = {
        edit: false,
        book: listBooks[index].book,
        edition: inputChangeEdition,
        year: listBooks[index].year,
      };
      const newList = [...listBooks];
      newList[index].edit = false;
      newList.splice(index, 1, inputChangeValues);
      setListBooks(newList);
      setInputChangeBook('');
      setInputChangeEdition('');
      setInputChangeYear('');
    } else if (inputChangeYear && inputChangeYear.length === 4) {
      const inputChangeValues = {
        edit: false,
        book: listBooks[index].book,
        edition: listBooks[index].edition,
        year: inputChangeYear,
      };
      const newList = [...listBooks];
      newList[index].edit = false;
      newList.splice(index, 1, inputChangeValues);
      setListBooks(newList);
      setInputChangeBook('');
      setInputChangeEdition('');
      setInputChangeYear('');
    } else {
      const newList = [...listBooks];
      listBooks[index].edit = false;
      setListBooks(newList);
    }
  };
  const removeInput = (index) => {
    const newList = [...listBooks];
    newList.splice(index, 1);
    setListBooks(newList);
  };

  const removeOthersBooks = () => {
    const newBook = [];
    setListBooks(newBook);
    props.dispatch(editOtherbooks(newBook));
  };

  const validateNextStep = (content) => {
    if (content.length > 0) {
      props.dispatch(editOtherbooks(content));
      props.dispatch(switchView('Congrats1'));
    } else {
      toast.error('Cliquez sur + avant de valider!', errorToasterStyle);
    }
  };

  const nextStep = () => {
    props.dispatch(switchView('Dedication'));
  };

  const previousStep = () => {
    props.dispatch(switchView('Subtitle'));
  };

  const ignoreStep = () => {
    props.dispatch(switchView('Congrats1'));
  };

  return (
    <div id="backgroundStep04">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Avez-vous écrit d&apos;autres livres ?</p>
          <Input
            className="form-control-alternative input"
            placeholder="Titre de votre livre"
            type="text"
            value={inputBook}
            onChange={e => setInputBook(e.target.value)}
          />
          <Input
            className="form-control-alternative input mt-3"
            placeholder="Edition de votre livre"
            type="text"
            value={inputEdition}
            onChange={e => setInputEdition(e.target.value)}
          />
          <Input
            className="form-control-alternative input mt-3"
            placeholder="Année de parution de votre livre"
            type="number"
            min="1900"
            max="2050"
            maxlength="4"
            value={inputYear}
            onChange={e => setInputYear(e.target.value)}
          />
          <div className="mt-3">
            {
              listBooks.map((book, index) => (
                <div>
                  {book.edit
                    ? (
                      <div key={[index]}>
                        <Input
                          type="text"
                          Value={listBooks[index].book}
                          onChange={e => setInputChangeBook(e.target.value)}
                        />
                        <Input
                          type="text"
                          Value={listBooks[index].edition}
                          onChange={e => setInputChangeEdition(e.target.value)}
                        />
                        <Input
                          type="number"
                          min="1900"
                          max="2050"
                          maxlength="4"
                          Value={listBooks[index].year}
                          onChange={e => setInputChangeYear(e.target.value)}
                        />
                        <i
                          className="fas fa-check"
                          role="link"
                          tabIndex={0}
                          onClick={() => updateInputValue(index)}
                          onKeyDown={() => { }}
                        />
                      </div>
                    )
                    : (
                      <div key={[index]} className="listBooks">
                        <span className="BOOK">
                          {book.book}
                        </span>
                        <span className="editionEtYear">
                          -
                          {book.edition}
                          -
                          {book.year}
                        </span>
                        <img
                          src={editPic}
                          onClick={() => inputEdit(index)}
                          className="editPic"
                          onKeyDown={() => { }}
                          alt="edit"
                        />
                        <img
                          src={removePic}
                          onClick={() => removeInput(index)}
                          onKeyDown={() => { }}
                          className="removePic"
                          alt="remove"
                        />
                      </div>
                    )
                  }
                </div>
              ))
            }
          </div>
          <i
            className="fas fa-plus-circle plusButton"
            onClick={addBook}
            onKeyDown={() => { }}
            role="button"
            tabIndex={0}
          />
          <div className="buttonLign">
            <Button
              onClick={() => removeOthersBooks()}
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
              onClick={() => validateNextStep(listBooks)}
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
              title="Sous-titre"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
            <i
              className="fas fa-chevron-circle-right validButton"
              onClick={nextStep}
              title="Dédicace"
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

export default connect(mapStatetoprops)(OthersBooks);

OthersBooks.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    otherBooks: PropTypes.array,
  }),
};

OthersBooks.defaultProps = {
  dispatch: null,
  head: null,
};
