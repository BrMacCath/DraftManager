export default function overwriteFileInOtherVault(vault:string,file:string,content:string="TestNew"){
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