import type FolderArrangement from "../../types/FolderTypes/folderArrangement";
import type draftConditions from "types/choices/draftConditions";
import { defaultFolderDraftConditions } from "./Default Values/defaultFolderDraftConditions";

export default interface DraftManagerSettings {
	folders: FolderArrangement[];
	defaultFolder:draftConditions;
	vaultList: string[];
}

export const DEFAULT_SETTINGS: DraftManagerSettings = {
	folders: [],
	defaultFolder: defaultFolderDraftConditions,
	vaultList: []
}