// Organise this.
import type { TFolder } from "obsidian";
import type draftConditions from "../choices/draftConditions";
import type FileArrangement from "./fileArrangement";
// The id property is added as each folder
// may be added multiple times and sometimes we
// will need to distingush where it is.
export default interface FolderArrangement {
    folder: TFolder;
    draftConditions: draftConditions;
    order: number;
    subFolders: FolderArrangement[];
    subFiles: FileArrangement[];
    compileOutPut: string;
    id: string;
}