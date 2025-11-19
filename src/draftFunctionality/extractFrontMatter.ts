import { frontmatterEndIndicator } from "types/frontmatter/frontmatterEndIndicator";

export function extractFrontMatter(content:string):[boolean,boolean,number]{
    const keepGoing = content.indexOf(frontmatterEndIndicator)> -1;
    let foundFrontmatter = false;
    let complete = false;
    let draftNum = -1;
    console.log("In function")
    // Is there frontmatter?
    if(!keepGoing){
        return [foundFrontmatter,complete,draftNum];
    }
    foundFrontmatter = true;
    console.log("Passed first");
    const newLine="\n"

    const frontmatterSplit= content.slice(0,content.indexOf(frontmatterEndIndicator))
    .split(newLine)
    .flatMap((line)=>{
        return line.trim()
    })
    .slice(1)

    let key:string[] = []
    let value:string[]=[]
    console.log("Passed second");
    frontmatterSplit.forEach((line)=>{
        const separatorSignifier= ":"
        const keyVal = line.split(separatorSignifier)
        key.push(keyVal[0].trim())
        value.push(keyVal[1].trim())
    } )
    // Is there complete status?
     console.log("Passed third");
    const completeKey= "complete"
    const completeIndex = key.indexOf(completeKey)
    console.log("Passed ");
    if(completeIndex>-1){
        complete = Boolean(value[completeIndex])
    }
    if(complete){return [foundFrontmatter,complete,draftNum]}
    
    const draftKey= "draftNum";
    const draftNumIndex = key.indexOf(draftKey)
    if (draftNumIndex ==-1){
        return [foundFrontmatter,complete,draftNum]
    }
    draftNum = Number(value[draftNumIndex])
    console.log("Passed first");
    return [foundFrontmatter,complete,draftNum]
}