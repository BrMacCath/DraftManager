import FolderArrangement from "../../types/choices/folderArrangement";
import draftConditions from "types/choices/draftConditions";

export default interface ResearchPluginSettings {
	draftFolders:string[];
	templates_folder:string;
	user_scripts_folder:string;
	folders: FolderArrangement[];
	defaultDraft: string;
	defaultFolder:draftConditions;
}

export const DEFAULT_SETTINGS: ResearchPluginSettings = {
	draftFolders: [],
	templates_folder:"",
	user_scripts_folder:"",
	folders: [],
	defaultDraft: "Peterson",
	defaultFolder: {draftStyle:{name:"Peterson"},haveComments:true, commentNotifier:"-",rewriteLineNotifier:">",
			draftStorage: "Drafts",	draftFileIndicator:"DRAFTS "}
}