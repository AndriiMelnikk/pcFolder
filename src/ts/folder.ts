export interface FolderState {
    files: Folder | Files[];
    visible: VisibleFolders;
    sort: SortFiles;
    loader: boolean;
}
export enum VisibleFolders {
    grid = 'grid',
    list = 'list'
}
export enum SortFiles {
    size = 'size',
    type = 'type',
    name = 'name',
    atime = 'atime',
    dev = 'dev',
    mtime = 'mtime'
}

export interface Folder {
    Folder1?: Files[];
    Folder2?: Files[];
    Folder3?: Files[];
}

export interface Files {
    atime: number | null;
    dev: number | null;
    mtime: number | null;
    name: string;
    size: number;
    type: string;
}
export interface apiFiles {
    data: {
        files: Folder;
    };
}
export enum iconFiles {
    pdf = 'pdf',
    msword = 'msword',
    folder = 'folder',
    png = 'png',
    jpeg = 'jpeg',
    docx = 'x-empty',
    xlsx = 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}
