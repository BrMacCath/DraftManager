import { Notice } from "obsidian";
//What should this do?
// Add onto the draft in two ways.
// First it should have a completed draft added onto the end of the draft.
// Second it should add onto the 

export function createFromFirstDraft(draft:string,paragraphSeparator:string, topicFrontMatterSeparator:string,haveTopicFrontMatter:Boolean,rewriteLineNotifier:string,commentLineSignifier:string=""):string{
    const newLineSeperator = commentLineSignifier + " \n" + rewriteLineNotifier +" \n\n";
    let paragraphs = draft.split(paragraphSeparator);
    let splitParagraph: [string,string[]][] = [];
    if( !haveTopicFrontMatter){

        paragraphs.forEach((paragraph) =>{
            const paraContent = paragraph.split(".");
            splitParagraph.push(["",paraContent])
        } )
    }
    else{
        paragraphs.forEach( (paragraph) =>{
            const temp = paragraph.split(topicFrontMatterSeparator)
            if(temp.length != 2){
                new Notice("Something has gone wrong. Length is " + temp.length);
            }
            const paraContent = temp[1].split(".");
            //const tempPara = paraContent.join(newLineSeperator) + newLineSeperator
            //paragaraphsEnd.push(temp[0]+ "\n" +topicFrontMatterSeparator+ tempPara)
            splitParagraph.push([temp[0],paraContent])
        }  )
    }

    // Complete Draft
    let completeDraft:string[] = []
    let newDraft:string[] = []
    splitParagraph.forEach( (content)=>{
        const sentences = content[1];
        completeDraft.push(sentences.join(".") +".") 
    }  )

    // Make new draft based on the topic front matter.
    if(!haveTopicFrontMatter){
        splitParagraph.forEach((content)=>{
            const sentences = content[1]
            newDraft.push(sentences.join(newLineSeperator)+newLineSeperator )
        })
    }
    else{
        splitParagraph.forEach((content)=>{
            const topicFrontMatter = content[0];
            const sentences = content[1]
            newDraft.push(topicFrontMatter+ topicFrontMatterSeparator +sentences.join(newLineSeperator)+newLineSeperator )
        })
    }
    // New Draft
    draft += "\n\n## Complete First Draft\n\n" + completeDraft.join("\n\n");
    draft += "# Second Draft\n\n" + newDraft.join(paragraphSeparator);
    console.log(draft)

}