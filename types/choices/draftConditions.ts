import draftStyle from "./draftStyle";

export default interface draftConditions{
    draftStyle:draftStyle;
    haveComments: boolean;
    commentNotifier:string;
    rewriteLineNotifier:string;
    draftStorage: string,
	draftFileIndicator: string
}