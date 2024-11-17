import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Redirect } from 'react-router';
import { JSX } from 'react';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default function PrivateRoute({ children }: Props) {
    const token = useSelector((state: RootState) => state.auth.token);

    const isAuthenticated = !!token;

    return (
        <>
            {isAuthenticated && children}
            {!isAuthenticated && <Redirect to="/auth/login" />}
        </>
    );
}
