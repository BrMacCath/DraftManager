import FolderArrangement from "../../types/choices/folderArrangement";

export default interface ResearchPluginSettings {
	draftFolders:string[];
	templates_folder:string;
	user_scripts_folder:string;
	test_type:[startloc:string,endloc:string];
	folders: FolderArrangement[];
}

export const DEFAULT_SETTINGS: ResearchPluginSettings = {
	draftFolders: [],
	templates_folder:"",
	user_scripts_folder:"",
	test_type: ["",""],
	folders: [],
}