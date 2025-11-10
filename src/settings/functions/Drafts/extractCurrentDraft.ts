import { createDraftTitle } from "./createDraftTitle";


export function extractCurrentDraft(content:string,draftNum:number) {
    const previousDraftTitle = createDraftTitle(draftNum);
    console.log(previousDraftTitle)
    const titleInd = content.indexOf(previousDraftTitle);
    if (titleInd ==-1){
        const continueForward = false;
        return [continueForward,""];
    }
    const continueForward = true;
    
    const currentDraft = content.slice(titleInd + previousDraftTitle.length);
    return [continueForward, currentDraft];
}