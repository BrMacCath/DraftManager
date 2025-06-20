import { App, TFile } from "obsidian"
import { splitContent } from "./splitContent";
import { updateFrontmatter } from "./updateFrontmatter";
import { stringifyNumber } from "./stringifyNumber";
import { createFromFirstDraft } from "./createFromFirstDraft";
import { createFromDraft } from "./createFromDraft";
import draftConditions from "types/choices/draftConditions";
export default async function createDraft(fileName:string,draftConditions:draftConditions,app:App):Promise<void>{
    const fileTFile:TFile = this.app.vault.getFileByPath(fileName)
    let fileTest = await this.app.vault.read(fileTFile);
    let [tempFrontMatter,content] = splitContent(fileTest);
    const draftNumSignifier = draftConditions.draftNumSignifier;
    const paragraphSeparator = draftConditions.paragraphSeparator;
    const topicFrontMatterSeparator = draftConditions.topicFrontMatterSeparator;
    const haveTopicFrontMatter = draftConditions.haveTopicFrontMatter;
    const rewriteLineSignfier = draftConditions.rewriteLineSignifier;
    const commentLineSignifier =  draftConditions.commentSignifier;
    // Update frontmatter through adding a new draft number
    let [frontMatter,oldDraftNum] = updateFrontmatter(tempFrontMatter, draftNumSignifier)
    // Isolate draft
    const previousDraftTitle = stringifyNumber(oldDraftNum);
    const newDraftTitle = stringifyNumber(oldDraftNum+1); 
    // Separate sections into paragarphs
    // If it is the first situation
    const titleInd = content.indexOf(previousDraftTitle);
    const sections = content.slice(titleInd + previousDraftTitle.length);
    
    

    if (oldDraftNum == 1){
        // Here we add the new title for the 
        const updatedContent = createFromFirstDraft(content,paragraphSeparator,topicFrontMatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
        const updatedFile = frontMatter + updatedContent;
        await app.vault.modify(fileTFile,updatedFile);
    }
    else{
        const updatedContent = createFromDraft(content,paragraphSeparator,oldDraftNum,topicFrontMatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
        const updatedFile = frontMatter + updatedContent;
        await app.vault.modify(fileTFile,updatedFile);
    }

}