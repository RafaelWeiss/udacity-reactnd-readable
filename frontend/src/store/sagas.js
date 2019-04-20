import { all } from 'redux-saga/effects';
import categoriesSaga from './sagas/categoriesSaga';
import postsSaga from './sagas/postsSaga';
import commentsSaga from './sagas/commentsSaga';

export default function* watchMany() {
    yield all([categoriesSaga(), postsSaga(), commentsSaga()]);
}
