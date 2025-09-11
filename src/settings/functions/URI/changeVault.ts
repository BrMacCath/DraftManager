export default function changeVault(vault:string){
    console.log("obsidian://new?vault=testVault&file=test2");
    const scheme= "obsidian://";
    const action = "open?";
    const setVaultParameter ="vault=";
    const targetParameter ="_external";

    window.open(scheme+action+setVaultParameter+vault,targetParameter)
}