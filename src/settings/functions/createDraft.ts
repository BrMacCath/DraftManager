import { App, TFile } from "obsidian"
import { splitContent } from "./splitContent";
import { updateFrontmatter } from "./updateFrontmatter";
import { stringifyNumber } from "./stringifyNumber";
import { createFromFirstDraft } from "./createFromFirstDraft";

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
    console.log(fileName)
    console.log("Within the draft function")
    console.log(oldDraftNum)
    const topicFronmatterSeparator = "*---*"
    const haveTopicFrontMatter = true;
    const rewriteLineSignfier =">";
    const commentLineSignifier = "*";

    if (oldDraftNum == 1){
        // Here we add the new title for the 
        const updatedContent = createFromFirstDraft(content,paragraphSeperator,topicFronmatterSeparator,haveTopicFrontMatter,rewriteLineSignfier,commentLineSignifier);
        const updatedFile = frontMatter + updatedContent;
        this.app.vault.modify(fileTFile,updatedFile)
    }
    else{
        
    }

    // Separate paragraphs into lines
    // splitContent function here

    // Create finished version of the draft
    // For each paragraph sentences .join(". ")

    // For each paragraph do .join("\n\n" )

    // Create a new draft with the sentences. 
    // Will need to check if add comments is there
    // New line joiner ="\n"
    // If has comments new line joiner += this.commentLineSignifier +" \n"
    // New line joiner += this.new line +" \n"
    const file = frontMatter+content;

}