import type FolderArrangement from "../../types/choices/folderArrangement";
import type draftConditions from "types/choices/draftConditions";


export default interface DraftManagerSettings {
	draftFolders:string[];
	templates_folder:string;
	user_scripts_folder:string;
	folders: FolderArrangement[];
	defaultDraft: string;
	defaultFolder:draftConditions;
}

export const DEFAULT_SETTINGS: DraftManagerSettings = {
	draftFolders: [],
	templates_folder:"",
	user_scripts_folder:"",
	folders: [],
	defaultDraft: "Peterson",
	defaultFolder: {draftStyle:{name:"Peterson"},haveComments:true, commentSignifier:"*",rewriteLineSignifier:">",
			draftStorage: "Drafts",	draftFileIndicator:"DRAFTS ",haveTopicFrontMatter: false,topicFrontMatterSeparator:"*---*",paragraphSeparator:"+---+",draftNumSignifier:"draftNum"}
}