import { createCompleteDraftTitle } from "../createCompleteDraftTitle";
import { inLineRemoval } from "../InLineEditing/inLineRemoval";
import { removeDoubleSpacing } from "../InLineEditing/removeDoubleSpacing";


export function extractCurrentDraft(content:string,draftNum:number):[boolean,string] {

    const previousDraftTitle = createCompleteDraftTitle(draftNum-1);
    const titleInd = content.indexOf(previousDraftTitle);
    if (titleInd ==-1){
        const continueForward = false;
        return [continueForward,""];
    }
    const continueForward = true;
    
    const currentDraft = removeDoubleSpacing(inLineRemoval(content.slice(titleInd + previousDraftTitle.length)));
    return [continueForward, currentDraft];
}