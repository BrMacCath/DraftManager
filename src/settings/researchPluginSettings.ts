import type ExperimentType from "types/choices/experimentType";
import type FolderArrangement from "../../types/choices/folderArrangement";
import type draftConditions from "types/choices/draftConditions";
import { Vault } from "obsidian";
import { fillOutFolderArrangement } from "./functions/SubFolderArrangement/fillOutFolderArrangement";

const vault:Vault = new Vault;
export default interface ResearchPluginSettings {
	draftFolders:string[];
	templates_folder:string;
	user_scripts_folder:string;
	folders: FolderArrangement[];
	defaultDraft: string;
	defaultFolder:draftConditions;
	//experiment: ExperimentType;
	citationKey: string;
}

export const DEFAULT_SETTINGS: ResearchPluginSettings = {
	draftFolders: [],
	templates_folder:"",
	user_scripts_folder:"",
	folders: [],
	defaultDraft: "Peterson",
	defaultFolder: {draftStyle:{name:"Peterson"},haveComments:true, commentSignifier:"*",rewriteLineSignifier:">",
			draftStorage: "Drafts",	draftFileIndicator:"DRAFTS ",haveTopicFrontMatter: false,topicFrontMatterSeparator:"*---*",paragraphSeparator:"+---+",draftNumSignifier:"draftNum"},
	//experiment: fillOutFolderArrangement(vault.getFolderByPath("Miscellaneous")),
	citationKey: "\cite{"
}