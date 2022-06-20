import React, { FC, useState, useEffect, useRef } from 'react';
import File from '../fise';
import style from './style.module.scss';

import { FiChevronLeft } from 'react-icons/fi';
import { CgMoreO } from 'react-icons/cg';
import { IoIosSearch } from 'react-icons/io';

import ModalSetting from '../modal/setting/';
import Loader from '../loader';
import Search from '../search';
import { Files, SortFiles, VisibleFolders } from '../../ts/folder';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../redux/hooks';

interface PropsForScreen {
    visibleFiles: VisibleFolders;
    files: any;
    sort: SortFiles;
    VisibleToggle: ActionCreatorWithPayload<VisibleFolders, string>;
    VisibleSort: ActionCreatorWithPayload<SortFiles, string>;
    setFiles: any;
    loader: boolean;
}

const PhoneScreen: FC<PropsForScreen> = ({
    visibleFiles,
    files,
    sort,
    VisibleToggle,
    VisibleSort,
    setFiles,
    loader
}) => {
    const dispatch = useAppDispatch();

    const [ namePrevFolder, setNamePrevFolder ] = useState('');
    const [ valueSearch, setValueSearch ] = useState('');
    const [ allFiles, setAllFiles ] = useState<Files[]>([]);

    const prevFiles = useRef(files);
    const namePrevFolderRef = useRef('');

    useEffect(
        () => {
            if (!Array.isArray(files)) {
                let Arrfiles = [];
                for (const t in files) {
                    const allSite = files[t].reduce((prev: number, current: Files) => prev + current.size, 0);
                    Arrfiles.push({
                        name: t,
                        atime: null,
                        dev: null,
                        mtime: null,
                        size: allSite,
                        type: 'folder'
                    });
                }
                setAllFiles([ ...Arrfiles ]);
                prevFiles.current = files;
            } else {
                setAllFiles([ ...files ]);
            }
        },
        [ files ]
    );

    allFiles.sort(function(a, b): any {
        // @ts-ignore
        let aObj = a[sort];
        // @ts-ignore
        let bObj = b[sort];
        if (aObj && typeof aObj !== 'number' && bObj && typeof bObj !== 'number') {
            let fa = aObj.toLowerCase(),
                fb = bObj.toLowerCase();

            if (fa < fb) return -1;
            else if (fa > fb) return 1;
            else return 0;
        } else if (typeof aObj == 'number') {
            return b.size - a.size;
        }
    });

    let visibleAllFilles = allFiles
        .filter((list): any => list.name.toLowerCase().includes(valueSearch.toLowerCase()))
        .map((e, index) => (
            <div
                key={index}
                onClick={() => {
                    openFolder(e.name);
                }}>
                <File visibleFiles={visibleFiles} info={e} />
            </div>
        ));

    const openFolder = (e: any) => {
        if (!Array.isArray(files)) {
            setNamePrevFolder(e);
            dispatch(setFiles(files[e]));
        }
    };

    return (
        <div className={style.screen}>
            <header className={style.header}>
                <div className={style.infoFolder}>
                    {namePrevFolder ? (
                        <div
                            onClick={() => {
                                setNamePrevFolder(namePrevFolderRef.current);
                                dispatch(setFiles(prevFiles.current));
                            }}>
                            <FiChevronLeft />
                            <span>{namePrevFolder}</span>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div>
                        <span> Folder</span>
                    </div>
                    <div onClick={() => {}}>
                        <ModalSetting VisibleToggle={VisibleToggle} VisibleSort={VisibleSort}>
                            <CgMoreO />
                        </ModalSetting>
                    </div>
                </div>
                <div className={style.search}>
                    <Search value={valueSearch} click={(e) => setValueSearch(e.value)}>
                        <IoIosSearch />
                    </Search>
                </div>
            </header>

            <div className={style.containerFolders}>
                {loader ? <Loader /> : <div className={style[visibleFiles]}>{visibleAllFilles}</div>}
            </div>
        </div>
    );
};

export default PhoneScreen;
