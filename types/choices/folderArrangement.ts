// Organise this.
import draftConditions from "./draftConditions";
import subFolderArrangement from "./subFolderArrangement";
export default interface FolderArrangement {
	folderName: string;
	id: string;
    haveSubFolders: boolean;
    haveDrafts: boolean;
    bibliography: string;
    draftConditions: draftConditions;
    subFolderArrangement:subFolderArrangement;
}