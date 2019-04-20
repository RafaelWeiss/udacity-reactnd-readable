import * as Yup from 'yup';

const getMsg = (msg, defaultMsg) => msg ? msg : defaultMsg

export const isRequired = (msg) =>  Yup.string().nullable().required(getMsg(msg,"msg.fieldIsRequired"));
///export const isSelectRequired = (msg) => Yup.object().shape({value: Yup.string().required()})(getMsg(msg,"msg.fieldIsRequired"));