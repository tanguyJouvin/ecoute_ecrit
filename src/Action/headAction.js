export const editAuthor = author => ({
  type: 'EDIT_AUTHOR',
  payload: author,
});

export const editTitle = title => ({
  type: 'EDIT_TITLE',
  payload: title,
});

export const editSubtitle = subtitle => ({
  type: 'EDIT_SUBTITLE',
  payload: subtitle,
});

export const editOtherbooks = otherBooks => ({
  type: 'EDIT_OTHERBOOKS',
  payload: otherBooks,
});

export const editDedication = dedication => ({
  type: 'EDIT_DEDICATION',
  payload: dedication,
});

export const editQuotes = quotes => ({
  type: 'EDIT_QUOTES',
  payload: quotes,
});

export const editThanks = content => ({
  type: 'EDIT_THANKS',
  payload: content,
});

export const editPreface = content => ({
  type: 'EDIT_PREFACE',
  payload: content,
});
