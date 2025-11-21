import { frontmatterEndIndicator } from "types/frontmatter/frontmatterEndIndicator";


export function removeFrontMatter(fileContent:string){
    const endIndex = fileContent.indexOf(frontmatterEndIndicator)
    if(endIndex==-1){
        return fileContent;
    }
    const content = fileContent.slice(endIndex + frontmatterEndIndicator.length)
    return content
    
}