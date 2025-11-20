import { extractFrontMatter } from "./draftFunctionality/extractFrontMatter";
import { extractCurrentDraft } from "./settings/functions/Drafts/extractCurrentDraft";
import { extractFinalVersion } from "./settings/functions/Drafts/extractFinalVersion";

export function extractLastVersionContent(content:string):string{
    const [keepGoing,complete,draftNum] =extractFrontMatter(content);
    console.log([keepGoing,complete,draftNum])
    if(!keepGoing){return ""}
    let text = ""
    let continueForward = true
    if(complete){
        const [continueForward, temp]= extractFinalVersion(content)
        text += temp;
    }
    else{ 
        const [continueForward, temp]= extractCurrentDraft(content,draftNum)
        
        text += temp;
    }
    return text
}