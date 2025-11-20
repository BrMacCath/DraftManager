import { inLineRemoval } from "./inLineRemoval";
import { removeDoubleSpacing } from "./removeDoubleSpacing";


export function extractFinalVersion(content:string):[boolean,string] {
    const finalDraft ="# Final Draft";
    const titleInd = content.indexOf(finalDraft);
    if (titleInd ==-1){
        const continueForward = false;
        return [continueForward,""];
    }
    const continueForward = true;
    
    const finalVersion = removeDoubleSpacing(inLineRemoval(content.slice(titleInd + finalDraft.length)));
    return [continueForward, finalVersion];
}