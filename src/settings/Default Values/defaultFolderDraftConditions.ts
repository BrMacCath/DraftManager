import type draftConditions from "types/choices/draftConditions";
import { frontmatterExtractionChoices } from "types/choices/frontmatterExtractionChoices";
import { moveTypeChoices } from "types/choices/moveTypeChoices";

import { extractTypeChoices } from "types/choices/extractTypeChoices";

// I was using this in several places for a while. I have since replaced
// this with this.settings.draft conditions but I use this as a placeholder
// to test new features.
export let defaultFolderDraftConditions:draftConditions=  {draftStyle:"Peterson",haveComments:true, commentSignifier:"*",rewriteLineSignifier:">",
			haveTopicFrontMatter: false,topicFrontMatterSeparator:"*---*",paragraphSeparator:"+---+",draftNumSignifier:"draftNum",
			includeFrontMatter: frontmatterExtractionChoices[0],moveType: moveTypeChoices[0],extractType: extractTypeChoices[0]}