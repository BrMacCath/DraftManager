// Organise this.
import draftConditions from "./draftConditions";
export default interface FolderArrangement {
	folderName: string;
	id: string;
    subFolders: boolean;
    haveDrafts: boolean;
    draftConditions: draftConditions;
}