import React, { FC, useState, useEffect } from 'react';
import { Files, iconFiles } from '../../ts/folder';
import { VisibleFolders } from '../../ts/folder';
import style from './style.module.scss';

interface Props {
    visibleFiles: VisibleFolders;
    info: Files;
}

const File: FC<Props> = ({ visibleFiles, info }) => {
    const size = info.size * 0.000001;
    const [ icon, setIcon ] = useState('folder');

    useEffect(
        () => {
            switch (info.type.split('/').slice(-1)[0]) {
                case iconFiles.folder:
                    setIcon(iconFiles.folder);
                    break;
                case iconFiles.png:
                    setIcon('img');
                    break;
                case iconFiles.jpeg:
                    setIcon('img');
                    break;
                case iconFiles.msword:
                    setIcon('word');
                    break;
                case iconFiles.pdf:
                    setIcon('pdf');
                    break;
                case iconFiles.docx:
                    setIcon('word');
                    break;
                case iconFiles.xlsx:
                    setIcon('xls');
                    break;
                default:
                    break;
            }
        },
        [ info ]
    );

    return (
        <div className={[ style.visibleFiles, style[visibleFiles] ].join(' ')}>
            <div>
                <img src={require(`../../img/icon/${icon}.png`)} alt='' />
            </div>
            <div>
                <h4>{info.name}</h4>
                <ul>
                    <li>
                        <span>{info.dev}</span>
                    </li>
                    <li>
                        <span>{size.toFixed(2)} MB</span>
                    </li>
                    <li>
                        <span>{info.type}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default File;
