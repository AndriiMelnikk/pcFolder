import React from 'react';
import Screen from './components/screen/ScreenContainer';
import style from './style.module.scss';
import { VisibleFolders } from './ts/folder';

export interface PropsForScreen {
    visibleFiles: VisibleFolders;
    files?: any;
}

function App() {
    return (
        <div className={style.app}>
            <Screen />
        </div>
    );
}

export default App;
