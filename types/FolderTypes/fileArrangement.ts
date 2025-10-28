
import type draftConditions from "types/choices/draftConditions";

export default interface FileArrangement{
    file:string;
    id:string;
    draftConditions: draftConditions;
}