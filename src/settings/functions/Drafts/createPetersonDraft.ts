import type draftConditions from "types/choices/draftConditions";
import { createFromPetersonDraft } from "./createFromPetersonDraft";

export function createPetersonDraft(content:string,draftNum:number,draftConditions:draftConditions){
    const newDraftNum = draftNum +1;
    const paragraphSeparator = draftConditions.paragraphSeparator;
    const topicFrontMatterSeparator = draftConditions.topicFrontMatterSeparator;
    const haveTopicFrontMatter = draftConditions.haveTopicFrontMatter;
    const rewriteLineSignfier = draftConditions.rewriteLineSignifier;
    const commentLineSignifier =  draftConditions.commentSignifier;
    const updatedContent = createFromPetersonDraft(content,paragraphSeparator,newDraftNum,topicFrontMatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
    return updatedContent
}