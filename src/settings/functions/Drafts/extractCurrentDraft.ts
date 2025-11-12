import { createDraftTitle } from "./createDraftTitle";
import { inLineRemoval } from "./inLineRemoval";
import { removeDoubleSpacing } from "./removeDoubleSpacing";


export function extractCurrentDraft(content:string,draftNum:number):[boolean,string] {
    const previousDraftTitle = createDraftTitle(draftNum);
    const titleInd = content.indexOf(previousDraftTitle);
    if (titleInd ==-1){
        const continueForward = false;
        return [continueForward,""];
    }
    const continueForward = true;
    
    const currentDraft = removeDoubleSpacing(inLineRemoval(content.slice(titleInd + previousDraftTitle.length)));
    return [continueForward, currentDraft];
}