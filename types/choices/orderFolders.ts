// This need to recognise that we have subfolders

import subFolderArrangement from "./subFolderArrangement";

export default interface orderFolders {
	folderName: string;
	id: string;
    subFolders: Boolean;
    haveDrafts: Boolean;
    subFolderArrangement: subFolderArrangement;
}