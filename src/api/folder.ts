import axios from 'axios';
import { apiFiles } from '../ts/folder';

const url = 'https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8';

export const Folders_api = {
    getFolders() {
        return axios.get<apiFiles>(url).then((res) => {
            return res.data.data.files;
        });
    }
};
