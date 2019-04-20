import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'reactstrap';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import InputContainer from '../../components/Form/InputContainer';
import CommentPropType from '../prop-types/CommentPropType';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { isRequired } from '../../utils/YupUtils';

function CommentForm({ intl, onSubmit, invalid, submitting, onCancel, comment }) {
    const isEdit = Boolean(comment.id);

    return (
        <Formik
            initialValues={{
                id: isEdit ? comment.id : null,
                author: isEdit ? comment.author : '',
                body: isEdit ? comment.body : ''
            }}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={Yup.object().shape({
                author: isRequired(),
                body: isRequired()
            })}>
            {(props) => {
                const { values, errors, handleChange, handleSubmit, isSubmitting } = props;
                return (
                    <Form onSubmit={handleSubmit}>
                        <InputContainer
                            name="author"
                            label="label.author"
                            placeholder="placeholder.author"
                            disabled={isEdit}
                            required={true}
                            value={values.author}
                            onChange={handleChange}
                            errors={errors.author}
                        />
                        <InputContainer
                            type="textarea"
                            name="body"
                            label="label.body"
                            placeholder="placeholder.body"
                            rows={3}
                            value={values.body}
                            onChange={handleChange}
                            errors={errors.body}
                        />
                        <div align="right" className={'margin-top-20'}>
                            <Button onClick={onCancel} color="primary">
                                <FormattedMessage id="button.cancel" />
                            </Button>
                            <Button color="primary" type="submit" disabled={isSubmitting}>
                                <FormattedMessage id="button.save" />
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

CommentForm.defaultProps = {
    comment: {}
};

CommentForm.propTypes = {
    comment: CommentPropType,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: { ...ownProps.comment }
    };
};

export default compose(
    connect(mapStateToProps),
    injectIntl
)(CommentForm);
