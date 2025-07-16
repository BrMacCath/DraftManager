import { Notice } from "obsidian";

export function splitContent(text:string):[string,string] {
  const meta_data_start = "---";
  const meta_data_end = "\n---\n";
  const start_file = text.slice(0, 3);
  if (meta_data_start != start_file) {
    new Notice("Front Matter is missing");
    // This needs to be an error function instead of just a notice
    return ["",""]
  }
  const index = text.indexOf(meta_data_end) + meta_data_end.length;
  const frontMatter = text.slice(0, index);
  const content = text.slice(index)
  return [frontMatter,content];
}