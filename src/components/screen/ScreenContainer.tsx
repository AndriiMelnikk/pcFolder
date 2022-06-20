import React, { useEffect } from 'react';
import Screen from './index';
import style from './style.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useCookies } from 'react-cookie';
import { Folders_api } from '../../api/folder';
import { setFiles, setVisible, setSort, setLoader } from '../../redux/reducer/folder';

function ScreenContainer() {
    const { files, visible, sort, loader } = useAppSelector((state) => state.folderReducer);
    const dispatch = useAppDispatch();
    const [ visibleC, setVisibleC ] = useCookies([ 'visible' ]);
    const [ sortC, setSortC ] = useCookies([ 'sort' ]);

    useEffect(() => {
        (async function() {
            dispatch(setLoader(true));
            const files = await Folders_api.getFolders();
            dispatch(setFiles(files));
            dispatch(setLoader(false));

            if (visibleC.visible) {
                dispatch(setVisible(visibleC.visible));
            }
            if (sortC.sort) {
                dispatch(setSort(sortC.sort));
            }
        })();
    }, []);

    return (
        <div className={style.app}>
            <Screen
                loader={loader}
                visibleFiles={visible}
                files={files}
                sort={sort}
                VisibleToggle={setVisible}
                VisibleSort={setSort}
                setFiles={setFiles}
            />
        </div>
    );
}

export default ScreenContainer;
