import React, { Fragment } from 'react';
import { ValidatorComponent } from 'react-form-validator-core';

class TextValidator extends ValidatorComponent {

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <p style={{
                color: 'red',
                width: '150px',
                fontSize: '12px',
                textAlign: 'center',
                position: 'absolute',
                left: '-40px',
                top: '-0px',
                padding: '0'
            }}>
                {this.getErrorMessage()}
            </p>
        );
    }

    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

        return (
            <Fragment>
                <input
                    {...rest}
                />
                {this.errorText()}
            </Fragment>
        );
    }
}

export default TextValidator;