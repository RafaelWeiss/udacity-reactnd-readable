import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'reactstrap';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import InputContainer from '../../components/Form/InputContainer';
import SelectContainer from '../../components/Form/SelectContainer';

import CategoryPropType from '../prop-types/CategoryPropType';
import PostPropType from '../prop-types/PostPropType';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { isRequired } from '../../utils/YupUtils';

function PostForm({ onSubmit, onCancel, categories, post, category }) {
    
    const selectOptions = [...categories].map((row) => {
        row.value = row.path;
        row.label = row.name;
        return row;
    });
    const isEdit = Boolean(post.id);
    const currentCategory = category ? category : null

    return (
        <Formik
            initialValues={{
                id: isEdit ? post.id : null,
                author: isEdit ? post.author : '',
                title: isEdit ? post.title : '',
                body: isEdit ? post.body : '',
                category: isEdit ? post.category : currentCategory
            }}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={Yup.object().shape({
                category: isRequired(),
                author: isRequired(),
                title: isRequired(),
                body: isRequired()
            })}>
            {(props) => {
                const {
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                } = props;
                return (
                    <Form onSubmit={handleSubmit}>
                        <SelectContainer
                            name="category"
                            label="label.category"
                            placeholder="placeholder.category"
                            disabled={isEdit}
                            required={true}
                            options={selectOptions}
                            value={values.category}
                            onChange={setFieldValue}
                            errors={errors.category}
                        />
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
                            name="title"
                            label="label.title"
                            placeholder="placeholder.title"
                            value={values.title}
                            required={true}
                            onChange={handleChange}
                            errors={errors.title}
                        />
                        <InputContainer
                            name="body"
                            type="textarea"
                            label="label.body"
                            placeholder="placeholder.body"
                            rows={6}
                            required={true}
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

PostForm.defaultProps = {
    post: {},
    categories: []
};

PostForm.propTypes = {
    post: PostPropType,
    categories: PropTypes.arrayOf(CategoryPropType),
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    category: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: { ...ownProps.post }
    };
};

export default compose(
    connect(mapStateToProps),
    injectIntl
)(PostForm);
