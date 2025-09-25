export default function overwriteFileInVault(vault:string,file:string,content:string="TestNew"){
    const scheme= "obsidian://";
    const action = "new?";
    const setVaultParameter ="vault="+ encodeURI(vault);
    const setFileParameter= "file="+ encodeURI(file);
    const setModeParameter= "overwrite"
    const setContentParameter= "content="+encodeURI(content);

    const parameters =[setModeParameter,setVaultParameter,setFileParameter,setContentParameter]
    const targetParameter ="_external";

    window.open(scheme+action+parameters.join("&"),targetParameter)
}

//			window.OBS_ACT({"scheme":"Obsidian","action":"new","vault":"testVault","file":"temp/test3","content":"test","openmode":"silent"});