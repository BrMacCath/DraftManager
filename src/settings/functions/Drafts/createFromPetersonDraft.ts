import { stringifyNumber } from "./stringifyNumber";
import { splitParagraphsNoFrontMatter } from "../ParagraphFunctions/splitParagraphsNoFrontMatter";
import { splitParagraphsFrontMatter } from "../ParagraphFunctions/splitParagraphsFrontMatter";
import { createDraftTitle } from "./createDraftTitle";

export function createFromPetersonDraft(content:string,paragraphSeparator:string,newDraftNum:number, topicFrontMatterSeparator:string,haveTopicFrontMatter:Boolean,rewriteLineSignifier:string,commentLineSignifier:string=""){
    const newLineSeperator = "\n"+commentLineSignifier + " \n" + rewriteLineSignifier +" \n\n";
    // Select the content from the current draft.
   
    
    let paragraphs = content.split(paragraphSeparator);
    let splitParagraph: [string,string[]][] = [];

    console.log(haveTopicFrontMatter)
    if(!haveTopicFrontMatter){
        splitParagraph =splitParagraphsNoFrontMatter(paragraphs,rewriteLineSignifier);
    }
    else
    {
        splitParagraph = splitParagraphsFrontMatter(paragraphs,rewriteLineSignifier,topicFrontMatterSeparator)
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
    const newLine = "\n";
    console.log(completeDraft)
    newContent += `\n\n## Complete ${stringifyNumber(newDraftNum-1)} Draft\n\n` + completeDraft.join("\n\n")+"\n\n";
    newContent += createDraftTitle(newDraftNum)+newLine+newLine + newDraft.join(paragraphSeparator +"\n");
    return newContent;
}
