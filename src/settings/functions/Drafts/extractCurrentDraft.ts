import { createCompleteDraftTitle } from "./createCompleteDraftTitle";
import { inLineRemoval } from "./inLineRemoval";
import { removeDoubleSpacing } from "./removeDoubleSpacing";


export function extractCurrentDraft(content:string,draftNum:number):[boolean,string] {
    console.log("Draft Num " + draftNum)
    const previousDraftTitle = createCompleteDraftTitle(draftNum-1);
    
    const titleInd = content.indexOf(previousDraftTitle);
    console.log(previousDraftTitle)
    console.log("Index: " +titleInd)
    if (titleInd ==-1){
        const continueForward = false;
        return [continueForward,""];
    }
    const continueForward = true;
    
    const currentDraft = removeDoubleSpacing(inLineRemoval(content.slice(titleInd + previousDraftTitle.length)));
    return [continueForward, currentDraft];
}