import {createStore} from 'redux';
import {StoreState} from './types/index';
import {enthusiasm} from './reducers/index';
import {EnthusiasmAction} from './actions';

const store = createStore<StoreState, EnthusiasmAction, any, any>(
  enthusiasm,
  {
    languageName: 'TypeScript',
    enthusiasmLevel: 1,
  }
);

export default store;
