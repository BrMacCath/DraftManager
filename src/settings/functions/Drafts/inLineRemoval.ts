export function inLineRemoval(line:string){
    const frontBrace = String.raw`\{\[`;
    const backBrace = String.raw`\]\}`;
    let regString = String.raw`${frontBrace}(.*?)${backBrace}`;
    let re = new RegExp(regString,"g" );
    return line.replace(re,"");
}