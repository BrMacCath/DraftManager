// Organise this.
import type draftConditions from "../choices/draftConditions";
import type FileArrangement from "./fileArrangement";
// The id property is added as each folder
// may be added multiple times and sometimes we
// will need to distingush where it is.
export default interface FolderArrangement {
    name: string;
    draftConditions: draftConditions;
    subFolders: FolderArrangement[];
    subFiles: FileArrangement[];
    compileOutput: string;
    id: string;
    moveType: string;
    extractType: string;
}