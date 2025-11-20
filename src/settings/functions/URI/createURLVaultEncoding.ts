export function createURLVaultEncoding(filePath:string,content:string,vault:string){
    const scheme= "obsidian://";
    const action = "new?";
    const setVaultParameter ="vault="+ encodeURI(vault);
    const setFileParameter= "file="+ encodeURIComponent(filePath);
    const setModeParameter= "overwrite";
    const setContentParameter= "content="+encodeURIComponent(content);

    const parameters =[setModeParameter,setVaultParameter,setFileParameter,setContentParameter]

    const urlVaultEncoding = scheme+action+parameters.join("&");
    return urlVaultEncoding
}