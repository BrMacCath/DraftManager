import type draftStyle from "./draftStyle";

export default interface draftConditions{
    draftStyle:draftStyle;
    haveComments: boolean;
    commentSignifier:string;
    paragraphSeparator:string;
    rewriteLineSignifier:string;
    haveTopicFrontMatter:boolean;
    topicFrontMatterSeparator:string;
    draftNumSignifier: string;
    draftStorage: string;
	draftFileIndicator: string;
}