import React, { FC, ReactElement } from 'react';
import style from './style.module.scss';

interface Search {
    value: string;
    click: (target: EventTarget & HTMLInputElement) => any;
    placeholder?: string;
    children?: ReactElement;
}

const Search: FC<Search> = ({ value, click, children, placeholder = 'Search' }) => {
    return (
        <div className={style.search}>
            <label>
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        click(e.target);
                    }}
                    value={value}
                    placeholder={placeholder}
                />
                {children}
            </label>
        </div>
    );
};

export default Search;
