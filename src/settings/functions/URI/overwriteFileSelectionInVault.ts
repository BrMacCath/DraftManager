import type { App, TFile } from "obsidian";
import { extractLastVersionContent } from "src/extractLastVersionContent";

export async function overwriteFileSelectionInVault(tFile:TFile,vault:string,app:App){
    const scheme= "obsidian://";
    const action = "new?";
    const setVaultParameter ="vault="+ encodeURI(vault);
    const setFileParameter= "file="+ encodeURIComponent(tFile.path);
    const setModeParameter= "overwrite";
    const content = await app.vault.cachedRead(tFile);
    const selection = extractLastVersionContent(content)
    
    const setContentParameter= "content="+encodeURIComponent(selection);
    console.log(setContentParameter)
    const parameters =[setModeParameter,setVaultParameter,setFileParameter,setContentParameter]
    const targetParameter ="_external";

    window.open(scheme+action+parameters.join("&"),targetParameter)
}

//			window.OBS_ACT({"scheme":"Obsidian","action":"new","vault":"testVault","file":"temp/test3","content":"test","openmode":"silent"});