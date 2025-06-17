import { Notice } from "obsidian";


export function createFromFirstDrive(draft:string,paragraphSeparator:string, topicFrontMatterSeparator:string,haveTopicFrontMatter:Boolean):string{
    let paragraphs = draft.split(paragraphSeparator);
    let splitParagraph: [string,string][] = [];
    let paragaraphsEnd:string[] = [];
    if( !haveTopicFrontMatter){
        paragaraphsEnd = paragraphs;
    }
    else{
        paragraphs.forEach( (paragraph) =>{
            const temp = paragraph.split(topicFrontMatterSeparator)
            if(temp.length != 2){
                new Notice("Something has gone wrong. Length is " + temp.length);
            }
            const paraContent = temp[1].split(".");
            
        }  )
    }


}