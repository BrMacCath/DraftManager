// This need to recognise that we have subfolders

import type draftConditions from "../choices/draftConditions";
export default interface orderFolders {
	folderName: string;
	id: string;
    subFolders: Boolean;
    haveDrafts: Boolean;
    draftConditions: draftConditions;
}