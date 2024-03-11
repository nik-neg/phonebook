import * as React from 'react';
import { useState } from 'react';
import { DialogCommonProps } from '../types';
import {
    AuthContainer,
    AuthForm,
    AuthFormWrapper,
    Input,
    SDialog,
    SLink,
    SWarningSpan,
    SWelcomeText,
} from './LoginRegisterDialog.styles';
import { useUser } from '../../../../context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerLoginSchema } from './validation/schema';
import { Spacer } from '../../../common/Spacer';
import { HttpStatusCode } from 'axios';
import { IWelcome } from './types';

export const LoginRegisterDialog = ({
    open,
    onClose,
}: DialogCommonProps): JSX.Element => {
    const { handleAuthenticated } = useUser();

    const [isRegistered, setIsRegistered] = useState(false);

    const defaultValues: IWelcome = {
        email: '',
        password: '',
    };

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        getValues,
        clearErrors,
    } = useForm({
        defaultValues,
        resolver: yupResolver(registerLoginSchema),
    });

    const handleLogin = async () => {
        if (isValid) {
            try {
                let url;
                if (isRegistered) {
                    url = import.meta.env.VITE_SERVER_URL_LOGIN;
                } else {
                    url = import.meta.env.VITE_SERVER_URL_REGISTER;
                }

                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(getValues()),
                });

                if (
                    res.status === HttpStatusCode.Created ||
                    res.status === HttpStatusCode.Ok
                ) {
                    const data = await res.json();
                    // updateUser(data);

                    if (data?.access_token) {
                        handleAuthenticated(true);
                    }
                }
            } catch (error) {
                console.log({ error });
            }
        }
    };
    const handleClose = async () => {
        onClose();
    };

    const handleIsRegistered = () => {
        clearErrors();
        setIsRegistered(!isRegistered);
    };
    return (
        <SDialog open={open} onClose={handleClose}>
            <AuthContainer>
                <SWelcomeText>Welcome</SWelcomeText>
                <AuthFormWrapper>
                    <AuthForm onSubmit={handleSubmit(handleLogin)}>
                        <Input
                            type="email"
                            placeholder="Email"
                            id={'email'}
                            {...register('email')}
                        />
                        {errors.email && (
                            <SWarningSpan>{errors.email.message}</SWarningSpan>
                        )}
                        <Input
                            type="password"
                            placeholder="Password"
                            id={'password'}
                            {...register('password')}
                        />
                        {errors.password && (
                            <SWarningSpan>
                                {errors.password.message}
                            </SWarningSpan>
                        )}
                        <Input
                            type="submit"
                            value={isRegistered ? 'Login' : 'Register'}
                            name={'submit'}
                            id={'submit'}
                            isSubmit
                        />
                    </AuthForm>
                </AuthFormWrapper>
                <Spacer height={10} />
                <SLink onClick={handleIsRegistered}>
                    {!isRegistered
                        ? 'Already user? Login here...'
                        : 'Not user yet? Register!'}
                </SLink>
            </AuthContainer>
        </SDialog>
    );
};
