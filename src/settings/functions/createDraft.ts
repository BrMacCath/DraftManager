import { TFile } from "obsidian"
import { splitContent } from "./splitContent";

export default async function createDraft(fileName:string):Promise<void>{
    const fileTFile:TFile = this.app.vault.getFileByPath(fileName)
    let fileTest = await this.app.vault.read(fileTFile);
    let [frontMatter,content] = splitContent(fileTest);

    // Update frontmatter through adding a new draft number

    // Isolate draft


    // Separate sections into paragarphs


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
}