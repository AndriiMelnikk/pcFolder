import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { FC, ReactElement, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { useCookies } from 'react-cookie';
import { VisibleFolders, SortFiles } from '../../../ts/folder';
import style from './style.module.scss';

interface Props {
    children: ReactElement;
    VisibleToggle: ActionCreatorWithPayload<VisibleFolders, string>;
    VisibleSort: ActionCreatorWithPayload<SortFiles, string>;
}

const ModalSetting: FC<Props> = ({ children, VisibleToggle, VisibleSort }) => {
    const [ visible, setVisible ] = useState(false);
    const dispatch = useAppDispatch();
    const [ sortC, setSortC ] = useCookies([ 'sort' ]);
    const [ visibleC, setVisibleC ] = useCookies([ 'visible' ]);

    const visibleF = (visible: VisibleFolders) => {
        dispatch(VisibleToggle(visible));
        setVisibleC('visible', visible, { path: '/' });
        setVisible(false);
    };
    const sortF = (sort: SortFiles) => {
        dispatch(VisibleSort(sort));
        setSortC('sort', sort, { path: '/' });
        setVisible(false);
    };

    return (
        <div className={style.container}>
            <div onClick={() => setVisible((prev) => true)}>{children}</div>
            <div className={[ style.modal, style.setting, style.phone, visible ? style.active : null ].join(' ')}>
                <div className={style.modalClose} onClick={() => setVisible((prev) => false)} />
                <ul>
                    <li onClick={() => visibleF(VisibleFolders.list)}>
                        <span>Список</span>
                    </li>
                    <li onClick={() => visibleF(VisibleFolders.grid)}>
                        <span>Блоки</span>
                    </li>
                    <li>
                        <hr />
                    </li>
                    <li onClick={() => sortF(SortFiles.size)}>
                        <span>Розмір</span>
                    </li>
                    <li onClick={() => sortF(SortFiles.type)}>
                        <span>Тип</span>
                    </li>
                    <li onClick={() => sortF(SortFiles.name)}>
                        <span>Назва</span>
                    </li>
                    <li onClick={() => sortF(SortFiles.atime)}>
                        <span>Останнє читання</span>
                    </li>
                    <li onClick={() => sortF(SortFiles.mtime)}>
                        <span>Останні зміни</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ModalSetting;
