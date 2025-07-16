import { Notice } from "obsidian";
import { createDraftTitle } from "./createDraftTitle";
import { stringifyNumber } from "./stringifyNumber";

export function createFromDraft(draft:string,paragraphSeparator:string,oldDraftNum:number, topicFrontMatterSeparator:string,haveTopicFrontMatter:Boolean,rewriteLineSignifier:string,commentLineSignifier:string=""){
    const newLineSeperator = "\n"+commentLineSignifier + " \n" + rewriteLineSignifier +" \n\n";
    // Select the content from the current draft.
    const currentDraftTitle = createDraftTitle(oldDraftNum);
    const contentIndex = draft.indexOf(currentDraftTitle) + currentDraftTitle.length;
    const contentDraft = draft.slice(contentIndex);

    let paragraphs = contentDraft.split(paragraphSeparator);
    let splitParagraph: [string,string[]][] = [];
    if( !haveTopicFrontMatter){
        paragraphs.forEach((paragraph) =>{
            const paraContent = paragraph.split("\n").filter((t) => {
                return t[0] == rewriteLineSignifier;
            }).map(t =>{
                return t.slice(1).trim();
            });
            splitParagraph.push(["",paraContent])
        } )
    }
    else{
        paragraphs.forEach( (paragraph) =>{
            const temp = paragraph.split(topicFrontMatterSeparator)
            if(temp.length != 2){
                new Notice("Something has gone wrong. Length is " + temp.length);
            }
            const paraContent = temp[1].split("\n").filter((t) => {
                return t[0] == rewriteLineSignifier;
            }).map(t =>{
                return t.slice(1).trim();
            });;
            splitParagraph.push([temp[0].trim(),paraContent]);
        }  )
    }
    // Complete Draft
    let completeDraft:string[] = []
    let newDraft:string[] = []
    splitParagraph.forEach( (content)=>{
        const sentences = content[1].map(t =>t.replace(".",""));
        completeDraft.push(sentences.join(". ") +".") 
    }  )

    // Make new draft based on the topic front matter.
    if(!haveTopicFrontMatter){
        splitParagraph.forEach((content)=>{
            const sentences = content[1].map(t => t.replace(".",""));
            newDraft.push("\n"+sentences.join(newLineSeperator)+newLineSeperator )
        })
    }
    else{
        splitParagraph.forEach((content)=>{
            const topicFrontMatter = content[0].trim();
            const sentences = content[1].map(t =>{
            return t.replace(".","")
        });
            newDraft.push(topicFrontMatter+"\n\n"+ topicFrontMatterSeparator+ "\n" +sentences.join(newLineSeperator)+newLineSeperator )
        })
    }
    // New Draft
    let newContent = "";
    newContent += `\n\n## Complete ${stringifyNumber(oldDraftNum)} Draft\n\n` + completeDraft.join("\n\n")+"\n\n";
    newContent += `# ${stringifyNumber(oldDraftNum+1)} Draft\n\n` + newDraft.join(paragraphSeparator +"\n");
    draft += newContent;
    return draft;
}
