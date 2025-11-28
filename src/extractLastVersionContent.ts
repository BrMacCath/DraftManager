import { extractFrontMatter } from "./draftFunctionality/extractFrontMatter";
import { extractCurrentDraft } from "./settings/functions/Drafts/Extract/extractCurrentDraft";
import { extractFinalVersion } from "./settings/functions/Drafts/Extract/extractFinalVersion";

export function extractLastVersionContent(content:string):string{
    const [keepGoing,complete,draftNum] =extractFrontMatter(content);
    if(!keepGoing){return ""}
    let text = ""

    if(complete){
        const [_, temp]= extractFinalVersion(content)
        text += temp;
    }
    else{ 
        const [_, temp]= extractCurrentDraft(content,draftNum)
        
        text += temp;
    }
    return text
}