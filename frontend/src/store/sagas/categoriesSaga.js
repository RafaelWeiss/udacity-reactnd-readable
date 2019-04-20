import {takeEvery} from 'redux-saga/effects';

import {types as categoriesTypes, actions as categoriesActions} from '../reducers/categoriesReducer';

import sagaApi from '../sagaApi';
import categoriesService from '../../services/categoriesService';


function* getAllCategories() {
    yield* sagaApi(
        categoriesService.getAllCategories,
        {},
        categoriesActions.getAllCategories.success
    );
}

export default function* categoriesSaga() {
    yield takeEvery(categoriesTypes.GET_ALL_CATEGORIES.REQUEST, getAllCategories);

}