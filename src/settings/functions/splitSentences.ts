export function splitSentences(paragraph:string):string[] {
  let paragraph_sentences:string[] = paragraph
    .split(".")
    .filter((t) => t != "") // Removes empty sentences
  return paragraph_sentences;
}