
import type draftConditions from "types/choices/draftConditions";

export default interface FileArrangement{
    name:string;
    id:string;
    draftConditions: draftConditions;
    moveType: string;
    extractType:string;
}