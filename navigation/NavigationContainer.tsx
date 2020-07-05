import React, { useEffect, useRef } from 'react'
import ShopNavigator from "./shop-navigation";
import { useSelector } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { RootState } from '../store/reducers';
import { RootNavigationEnum } from '../interface/Navigation';

interface INavigationContainer { }

export const NavigationContainer: React.FC<INavigationContainer> = () => {
    const navRef = useRef<any>();
    const isAuth = useSelector((state: RootState) => !!state.auth.token);
    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({ routeName: RootNavigationEnum.Auth }));
        }
    }, [isAuth]);

    return <ShopNavigator ref={navRef} />
}
