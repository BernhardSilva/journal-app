/*
    {
        notes: [],
        active: null,
        active: {
            id: 'ÑALKSJDLKASJDÑAKSJD'
            tittle: '',
            body: '',
            imageUrl: '',
            date: 12312321344
        }
    }
*/
const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
