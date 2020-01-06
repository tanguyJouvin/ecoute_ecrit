const { localStorage } = window;

export const setBookHead = (bookHead) => {
  if (localStorage.getItem('bookhead')) {
    localStorage.removeItem('bookhead');
  }
  localStorage.setItem('bookhead', JSON.stringify(bookHead));
};

export const getBookHead = () => {
  if (localStorage.getItem('bookhead')) {
    return JSON.parse(localStorage.getItem('bookhead'));
  } return {
    author: '',
    title: '',
    subtitle: '',
    otherBooks: [],
    dedication: [],
    quotes: [],
    thanks: {
      position: 'debut',
      text: '',
    },
    preface: '',
    prologue: '',
    foreword: '',
    preambule: '',
    resume: '',
  };
};

export const setBookBody = (bookBody) => {
  if (localStorage.getItem('bookbody')) {
    localStorage.removeItem('bookbody');
  }
  localStorage.setItem('bookbody', JSON.stringify(bookBody));
};

export const getBodyBook = () => {
  if (localStorage.getItem('bookbody')) {
    return JSON.parse(localStorage.getItem('bookbody'));
  } return [];
};
