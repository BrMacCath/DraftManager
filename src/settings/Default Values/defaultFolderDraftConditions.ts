import type draftConditions from "types/choices/draftConditions";
import { contentChoices } from "types/choices/contentChoices";

// I was using this in several places for a while. I have since replaced
// this with this.settings.draft conditions but I use this as a placeholder
// to test new features.
export let defaultFolderDraftConditions:draftConditions=  {draftStyle:"Peterson",haveComments:true, commentSignifier:"*",rewriteLineSignifier:">",
			haveTopicFrontMatter: false,topicFrontMatterSeparator:"*---*",paragraphSeparator:"+---+",draftNumSignifier:"draftNum",
			moveType: contentChoices[0],extractType: contentChoices[0]}