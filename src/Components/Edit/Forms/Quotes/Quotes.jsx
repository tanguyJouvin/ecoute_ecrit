import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Input, Button } from 'reactstrap';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../../toasterConfig';
import { editQuotes } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import editPic from '../../../../pics/edit.png';
import removePic from '../../../../pics/remove.png';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './Quotes.css';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Quotes(props) {
  const [listQuotes, setListQuotes] = useState([]);
  const [inputQuote, setInputQuote] = useState('');
  const [inputAuthor, setInputAuthor] = useState('');
  const [inputChangeQuote, setInputChangeQuote] = useState('');
  const [inputChangeAuthor, setInputChangeAuthor] = useState('');
  const [inputStatusUpdate, setInputStatusUpdate] = useState(false);

  useEffect(() => {
    setListQuotes(props.head.quotes);
  }, []);

  const addQuote = () => {
    if (
      inputQuote
      && inputQuote.length > 0
      && inputAuthor
      && inputAuthor.length > 0
      && listQuotes.length < 3
    ) {
      const inputQuoteAuthor = {
        edit: false,
        quote: inputQuote,
        author: inputAuthor,
      };
      setInputQuote('');
      setInputAuthor('');
      setListQuotes([...listQuotes, inputQuoteAuthor]);
    } else if (
      setInputQuote.length > 0
      && setInputAuthor.length > 0
      && listQuotes.length < 3
    ) {
      toast.error('Cliquez sur + avant de valider !', errorToasterStyle);
    } else if (
      inputQuote.length === 0
      && inputAuthor.length === 0
    ) {
      toast.error('Merci de remplir le champ !', errorToasterStyle);
    } else {
      toast.error('Vous pouvez ajouter 3 citations maximum !', errorToasterStyle);
    }
  };

  const inputEdit = (index) => {
    const newList = [...listQuotes];
    newList[index].edit = true;
    setListQuotes(newList);
    setInputStatusUpdate(true);
  };

  const updateInputValue = (index) => {
    setInputStatusUpdate(false);
    if (
      inputChangeQuote
      && inputChangeQuote.length > 0
      && inputChangeAuthor
      && inputChangeAuthor.length > 0
    ) {
      const inputChangeValues = {
        edit: false,
        quote: inputChangeQuote,
        author: inputChangeAuthor,
      };
      const newList = [...listQuotes];
      newList[index].edit = false;
      newList.splice(index, 1, inputChangeValues);
      setListQuotes(newList);
      setInputChangeQuote('');
      setInputChangeAuthor('');
    } else if (inputChangeQuote && inputChangeQuote.length > 0) {
      const inputChangeValues = {
        edit: false,
        quote: inputChangeQuote,
        author: listQuotes[index].author,
      };
      const newList = [...listQuotes];
      newList[index].edit = false;
      newList.splice(index, 1, inputChangeValues);
      setListQuotes(newList);
      setInputChangeQuote('');
      setInputChangeAuthor('');
    } else if (inputChangeAuthor && inputChangeAuthor.length > 0) {
      const inputChangeValues = {
        edit: false,
        quote: listQuotes[index].quote,
        author: inputChangeAuthor,
      };
      const newList = [...listQuotes];
      newList[index].edit = false;
      newList.splice(index, 1, inputChangeValues);
      setListQuotes(newList);
      setInputChangeQuote('');
      setInputChangeAuthor('');
    } else {
      const newList = [...listQuotes];
      listQuotes[index].edit = false;
      setListQuotes(newList);
    }
  };

  const removeInput = (index) => {
    const newList = [...listQuotes];
    newList.splice(index, 1);
    setListQuotes(newList);
  };

  const removeQuotes = () => {
    const newQuote = [];
    setListQuotes(newQuote);
    props.dispatch(editQuotes(newQuote));
  };

  const validateNextStep = (content) => {
    if (content.length > 0) {
      props.dispatch(editQuotes(content));
      props.dispatch(switchView('Thanks'));
    } else {
      toast.error('Cliquez sur + avant de valider!', errorToasterStyle);
    }
  };

  const nextStep = () => {
    props.dispatch(switchView('Thanks'));
  };

  const previousStep = () => {
    props.dispatch(switchView('Dedication'));
  };

  const ignoreStep = () => {
    props.dispatch(switchView('Thanks'));
  };

  return (
    <div id="backgroundStep6">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Souhaitez-vous insérer une citation ?</p>
          <Input
            className="form-control-alternative input"
            placeholder="Votre citation"
            type="text"
            value={inputQuote}
            onChange={e => setInputQuote(e.target.value)}
          />
          <Input
            className="form-control-alternative input mt-3"
            placeholder="L'auteur de votre citation"
            type="text"
            value={inputAuthor}
            onChange={e => setInputAuthor(e.target.value)}
          />
          <div className="mt-3">
            {
              listQuotes.map((quote, index) => (
                <div>
                  {quote.edit
                    ? (
                      <div key={[index]}>
                        <Input
                          type="text"
                          Value={listQuotes[index].quote}
                          onChange={e => setInputChangeQuote(e.target.value)}
                        />
                        <Input
                          type="text"
                          Value={listQuotes[index].author}
                          onChange={e => setInputChangeAuthor(e.target.value)}
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
                      <div key={[index]} className="listQuotes">
                        <span className="quote">
                          {quote.quote}
                        </span>
                        -
                        {quote.author}
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
            onClick={addQuote}
            onKeyDown={() => { }}
            role="button"
            tabIndex={0}
          />
          <div className="buttonLign">
            <Button
              onClick={() => removeQuotes()}
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
              onClick={() => validateNextStep(listQuotes)}
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
              title="Dédicace"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
            <i
              className="fas fa-chevron-circle-right validButton"
              onClick={nextStep}
              title="Remerciements"
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

export default connect(mapStatetoprops)(Quotes);

Quotes.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    quotes: PropTypes.array,
  }),
};

Quotes.defaultProps = {
  dispatch: null,
  head: null,
};
