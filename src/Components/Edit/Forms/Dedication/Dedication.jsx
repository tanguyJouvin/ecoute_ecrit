import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button } from 'reactstrap';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../../toasterConfig';
import { editDedication } from '../../../../Action/headAction';
import switchView from '../../../../Action/viewAction';
import editPic from '../../../../pics/edit.png';
import removePic from '../../../../pics/remove.png';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './Dedication.css';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Dedication(props) {
  const [listDedication, setListDedication] = useState([]);
  const [inputDedication, setInputDedication] = useState({});
  const [inputChange, setInputChange] = useState({});
  const [inputStatusUpdate, setInputStatusUpdate] = useState(false);

  useEffect(() => {
    setListDedication(props.head.dedication);
  }, []);

  const addDedication = () => {
    if (inputDedication.name && inputDedication.name.length > 0 && listDedication.length < 3) {
      setInputDedication({ edit: false, name: '' });
      setListDedication([...listDedication, inputDedication]);
    } else if (setInputDedication.name.length > 0 && listDedication.length < 3) {
      toast.error('Cliquez sur + avant de valider !', errorToasterStyle);
    } else {
      toast.error('Vous pouvez ajouter 3 dédicaces maximum !', errorToasterStyle);
    }
  };

  const inputEdit = (index) => {
    const newList = [...listDedication];
    newList[index].edit = true;
    setListDedication(newList);
    setInputStatusUpdate(true);
  };

  const updateInputValue = (index) => {
    setInputStatusUpdate(false);
    if (inputChange.name && inputChange.name.length > 0) {
      const newList = [...listDedication];
      newList[index].edit = false;
      newList.splice(index, 1, inputChange);
      setListDedication(newList);
      setInputChange({});
    } else if (inputChange.name === undefined) {
      const newList = [...listDedication];
      listDedication[index].edit = false;
      setListDedication(newList);
    } else {
      toast.error('Merci de remplir le champ !', errorToasterStyle);
    }
  };

  const validateNextStep = (content) => {
    if (content.length > 0) {
      props.dispatch(editDedication(content));
      props.dispatch(switchView('Quotes'));
    } else {
      toast.error('Cliquez sur + avant de valider !', errorToasterStyle);
    }
  };

  const removeInput = (index) => {
    const newList = [...listDedication];
    newList.splice(index, 1);
    setListDedication(newList);
  };

  const removeDedication = () => {
    const newDedication = [];
    setListDedication(newDedication);
    props.dispatch(editDedication(newDedication));
  };

  const nextStep = () => {
    props.dispatch(switchView('Quotes'));
  };

  const previousStep = () => {
    props.dispatch(switchView('OthersBooks'));
  };

  const ignoreStep = () => {
    props.dispatch(switchView('Quotes'));
  };

  return (
    <div id="backgroundStep4">
      <div className="inputContainer">
        <div className="container">
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            className="far fa-question-circle help"
          />
          <p className="questionInput">Souhaitez-vous faire une dédicace ?</p>
          <Input
            className="form-control-alternative input"
            placeholder="Dédicace"
            type="text"
            value={inputDedication.name}
            onChange={e => setInputDedication({ edit: false, name: e.target.value })}
          />
          <div>
            {
              listDedication.map((dedication, index) => (
                <div>
                  {
                    dedication.edit
                      ? (
                        <div keys={[index]}>
                          <Input
                            type="text"
                            Value={listDedication[index].name}
                            onChange={e => setInputChange({ edit: false, name: e.target.value })}
                          />
                          <i
                            className="fas fa-check"
                            role="button"
                            tabIndex={0}
                            onClick={() => updateInputValue(index)}
                            onKeyDown={() => { }}
                          />
                        </div>
                      )
                      : (
                        <div
                          className="listDedication"
                        >
                          {dedication.name}
                          <img
                            src={editPic}
                            onClick={() => inputEdit(index)}
                            className="editPic"
                            onKeyDown={() => { }}
                            tabIndex={0}
                            alt="edit"
                          />
                          <img
                            src={removePic}
                            onClick={() => removeInput(index)}
                            onKeyDown={() => { }}
                            tabIndex={0}
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
            onClick={addDedication}
            onKeyDown={() => { }}
            role="button"
            tabIndex={0}
          />
          <div className="buttonLign">
            <Button
              onClick={() => removeDedication()}
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
              onClick={() => validateNextStep(listDedication)}
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
              title="Autres livres"
              onKeyDown={() => { }}
              role="button"
              tabIndex={0}
            />
            <i
              className="fas fa-chevron-circle-right validButton"
              onClick={nextStep}
              title="Citations"
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

export default connect(mapStatetoprops)(Dedication);

Dedication.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    dedication: PropTypes.string,
  }),
};

Dedication.defaultProps = {
  dispatch: null,
  head: null,
};
