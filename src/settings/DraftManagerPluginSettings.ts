import type draftConditions from "types/choices/draftConditions";
import { defaultFolderDraftConditions } from "./Default Values/defaultFolderDraftConditions";
import type { BaseFolderArrangement } from "types/FolderTypes/BaseFolderArrangement";

export default interface DraftManagerSettings {
	folders: BaseFolderArrangement[];
	defaultFolderConditions:draftConditions;
	vaultList: string[];
}

export const DEFAULT_SETTINGS: DraftManagerSettings = {
	folders: [],
	defaultFolderConditions: defaultFolderDraftConditions,
	vaultList: []
}