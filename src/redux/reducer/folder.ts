import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FolderState, SortFiles, VisibleFolders } from '../../ts/folder';

const initialState: FolderState = {
    files: {},
    visible: VisibleFolders.grid,
    sort: SortFiles.name,
    loader: true
};

export const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        setVisible: (state, action: PayloadAction<VisibleFolders>) => {
            state.visible = action.payload;
        },
        setFiles: (state, action: PayloadAction<FolderState['files']>) => {
            state.files = action.payload;
        },
        setSort: (state, action: PayloadAction<FolderState['sort']>) => {
            state.sort = action.payload;
        },
        setLoader: (state, action: PayloadAction<FolderState['loader']>) => {
            state.loader = action.payload;
        }
    }
});

export const { setVisible, setFiles, setSort, setLoader } = folderSlice.actions;

export default folderSlice.reducer;
