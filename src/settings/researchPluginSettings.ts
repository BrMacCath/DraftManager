import FolderArrangement from "../../types/choices/folderArrangement";

export default interface ResearchPluginSettings {
	draftFolders:string[];
	templates_folder:string;
	user_scripts_folder:string;
	folders: FolderArrangement[];
	defaultDraft: string;
}

export const DEFAULT_SETTINGS: ResearchPluginSettings = {
	draftFolders: [],
	templates_folder:"",
	user_scripts_folder:"",
	folders: [],
	defaultDraft: "Peterson"
}