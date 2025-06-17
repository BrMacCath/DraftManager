import { TFile } from "obsidian"
import { splitContent } from "./splitContent";
import { updateFrontmatter } from "./updateFrontmatter";
import { stringifyNumber } from "./stringifyNumber";

export default async function createDraft(fileName:string,draftNumIndicator:string, paragraphSeperator:string):Promise<void>{
    const fileTFile:TFile = this.app.vault.getFileByPath(fileName)
    let fileTest = await this.app.vault.read(fileTFile);
    let [tempFrontMatter,content] = splitContent(fileTest);

    // Update frontmatter through adding a new draft number
    let [frontMatter,oldDraftNum] = updateFrontmatter(tempFrontMatter, draftNumIndicator)
    // Isolate draft
    const previousDraftTitle = stringifyNumber(oldDraftNum);
    const newDraftTitle = stringifyNumber(oldDraftNum+1); 
    let paragraphs:string[] = []
    // Separate sections into paragarphs
    // If it is the first situation
    const titleInd = content.indexOf(previousDraftTitle);
    const sections = content.slice(titleInd + previousDraftTitle.length);
    if (oldDraftNum == 1){
        // Here we add the new title for the 
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