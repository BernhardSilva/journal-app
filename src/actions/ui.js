import { types } from '../types/types';

export const setErrorAction = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const removeErrorAction = () => ({
  type: types.uiRemoveError,
});

//al ser acciones sincronas no necesito ponerles ningún return 👇
export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});
