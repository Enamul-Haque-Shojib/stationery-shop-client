

import { NavLink } from 'react-router-dom';

import { TUserPath } from '../types';
import { MenuProps } from 'antd';

export const sidebarItemsGenerator = (items: TUserPath[], role: string): MenuProps['items'] => {
    return items.reduce<MenuProps['items']>((acc, item) => {
        if (item.path && item.name) {
            acc?.push({
                key: item.name,
                label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
            });
        }

        if (item.children) {
            const childItems = item.children
                .filter((child) => child.name && child.path)
                .map((child) => ({
                    key: child.name!,
                    label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
                }));

            if (childItems.length > 0) {
                acc?.push({
                    key: item.name!,
                    label: item.name,
                    children: childItems,
                });
            }
        }

        return acc;
    }, []);
};


