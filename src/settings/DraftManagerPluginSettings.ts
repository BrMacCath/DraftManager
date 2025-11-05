import type FolderArrangement from "../../types/FolderTypes/folderArrangement";
import type draftConditions from "types/choices/draftConditions";
import { defaultFolderDraftConditions } from "./Default Values/defaultFolderDraftConditions";

export default interface DraftManagerSettings {
	folders: FolderArrangement[];
	defaultFolderConditions:draftConditions;
	vaultList: string[];
}

export const DEFAULT_SETTINGS: DraftManagerSettings = {
	folders: [],
	defaultFolderConditions: defaultFolderDraftConditions,
	vaultList: []
}