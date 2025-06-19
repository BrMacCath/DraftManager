import { App, TFile } from "obsidian"
import { splitContent } from "./splitContent";
import { updateFrontmatter } from "./updateFrontmatter";
import { stringifyNumber } from "./stringifyNumber";
import { createFromFirstDraft } from "./createFromFirstDraft";
import { createFromDraft } from "./createFromDraft";
export default async function createDraft(fileName:string,draftNumIndicator:string, paragraphSeperator:string,app:App):Promise<void>{
    const fileTFile:TFile = this.app.vault.getFileByPath(fileName)
    let fileTest = await this.app.vault.read(fileTFile);
    let [tempFrontMatter,content] = splitContent(fileTest);

    // Update frontmatter through adding a new draft number
    let [frontMatter,oldDraftNum] = updateFrontmatter(tempFrontMatter, draftNumIndicator)
    // Isolate draft
    const previousDraftTitle = stringifyNumber(oldDraftNum);
    const newDraftTitle = stringifyNumber(oldDraftNum+1); 
    // Separate sections into paragarphs
    // If it is the first situation
    const titleInd = content.indexOf(previousDraftTitle);
    const sections = content.slice(titleInd + previousDraftTitle.length);
    const topicFronmatterSeparator = "*---*"
    const haveTopicFrontMatter = true;
    const rewriteLineSignfier =">";
    const commentLineSignifier = "*";

    if (oldDraftNum == 1){
        // Here we add the new title for the 
        const updatedContent = createFromFirstDraft(content,paragraphSeperator,topicFronmatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
        const updatedFile = frontMatter + updatedContent;
        await this.app.vault.modify(fileTFile,updatedFile);
    }
    else{
        const updatedContent = createFromDraft(content,paragraphSeperator,oldDraftNum,topicFronmatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
        const updatedFile = frontMatter + updatedContent;
        await this.app.vault.modify(fileTFile,updatedFile);
    }

}