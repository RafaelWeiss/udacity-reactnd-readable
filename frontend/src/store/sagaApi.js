import { call, put } from 'redux-saga/effects';
import { actions as loadingActions } from './reducers/loadingReducer';
import { showErrorMessage, showSuccessMessage } from '../commons/notification/notification';

const defaultSettings = {
    callSuccessFunction: false
};

export default function* sagaApi(fn, parameter, success, successMessageKey, failure, failureMessageKey, settings = {}) {
    const config = { ...defaultSettings, ...settings };
    const { callSuccessFunction } = config;

    try {
        yield put(loadingActions.showLoading());

        const response = yield call(fn, parameter);
        const data = response ? response.data : {};

        if (success) {
            yield callSuccessFunction ? call(success, data) : put(success(data));
        }

        ///yield delay(2000); 

        if (successMessageKey) {
            yield put(showSuccessMessage(successMessageKey));
        }
    } catch (error) {
        const failureMessage = failureMessageKey ? failureMessageKey : error;

        yield put(showErrorMessage(failureMessage));

        if (failure) {
            yield put(failure(error));
        }
    } finally {
        yield put(loadingActions.hideLoading());
    }
}
