# Draft Manager
[![Version](https://img.shields.io/github/v/release/BrMacCath/DraftManager?include_prereleases&label=latest&logo=github&labelColor=green)](https://github.com/BrMacCath/DraftManager/releases)  [![Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22draft-manager%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)](https://obsidian.md/plugins?search=Draft%20Manager) 

This plugin is to help order writing drafts in Obsidian and how to manage the final product. This plugin will allow for different draft styles.

# What is the purpose of this plugin

I think Obisidian is a great tool to store notes and to writing but I found that having a vault for both purposes led to me getting overwhelmed. 

# Set up

## Name vaults that you can move files to

State the vaults that you wish to be able to transfer files to. Right now there is no method to check that the vault listed is a valid vault. If you try to move files to a vault that does not exist you will just get an error message. A gif to show how to add vaults is below.
<img src="/Gifs/AddVault.gif" />

## Make Default draft conditions

There is a selection of draft types that can be used with this plugin. Explanations of the draft styles are in the next section. 

# Moving Files

There are two methods of moving files in this plugin. They require that you set up which vaults you can move them to.

## Move entire folder using a command

If you want to move all the files within a folder without any changes, you can use a command to do do this. A gif is presented below.
<img src="/Gifs/MoveFilesToVault.gif" />

# Draft Styles

This plugin has draft styles: Blank and Peterson that you can use if you put them in the frontmatter. The default frontmatter property is draftStyle. You will also need to state the number on the draft that your page is on. The default frontmatter property is draftNum. If you want to have a complete version of a page, the default frontmatter property is complete. 


## Blank

This draft style updates the frontmatter and adds the next draft number title to the page.

## Peterson

This draft style follows the draft style that is mentioned by Dr. Peterson in link. I will go through the link and then mention the changes I made for myself. The structure of this draft style to seperate each paragraph based around one topic and write 100-300 words per paragraph. After you have written a rough draft, you rewrite each sentence from the paragraph individually with a line underneath it to write a new version in. After you have rewritten each sentence, you combine them together to recreate the paragraph. You keep repeating this process until you have great paragraphs. I decided to automate a lot of the rewritting process by automating the splitting of each paragraph into its lines and the stiching of the rewriting back.

I have made two adjustments to this process that you can ignore. In the paper Dr. Peterson talked about cultural context that the reader uses to understand text. I was unsure of what that meant ( I intent to reread that) but thinking about the context of the reader is a feature of the writing process that I did not have concretely inside this process for me. Others have found this sufficient so I made this optional but this seems like something that should run in the background but its affect is not obviously visable in the end result. This has a similar feeling to frontmatter in Obsidian. I decided to have writing "frontmatter" on each section and rewriting to try make sure my goals are aligned. Each paragraphs is separated by a paragraph separator. Then each paragraphs consists of two parts, the frontmatter and the content. 

The second change is to have the frontmatter brought along. In Peterson's paper he does not keep rewriting this and, honestly, if you had to personally rewrite it each time, it would be a waste of time. I wanted to bring this along for two reasons. I want to examine my thinking as I am writing so I decided to make it easily accessible. I also really admire a lot of the people who learn in public. I have been very impressed by what people in that community have done and I want to do it too. So I want to show my misunderstandings and how they changed (or didn't). For this reason, I want to bring these things along.

### In line comments

I read some books about writing to try gain some understanding on how to approach topics. I read on writing well by author. A suggestion he had that I liked was inline comments. When he was a teacher, if a student had a piece of the line that he thought was incorrect, he would put it in parentheses and sy why he thinks it should be removed. I liked that a lot so I put it in this plugin. However, parenthesis are used in markdown for website links and other uses. I decided to change the parenthesis to {[ ]} as they do not have another use. Note that in line comments will apply to both writing styles.

### First Version

### Versions after the first

### Final Version

### In Line removal

On writing well. Suggestions that the author took. Also, learning in public.

# Move Type and extraction Type

With each file there are two methods that we can apply to them. Move type will talk about how content from that file will be moved to the new vault. Extraction type decides how content from this file will be taken to make a new file. There are the same four options for each.
## As Is

Take the entire file.

## Content

This takes the content of the file and ignores the frontmatter.

## Do not use

This tells the plugin to skip this file for the respected operation.

## Last Version

This uses the last version of your writing. This will select either your last completed draft or the final version of your draft.

# Folder Updates

With the folder updates section, you can control how you want files to be processed and in what order.

## Compile output

Here you can use the files in a folder to be combined to make a new file in one of the files. This can be the entire file or just a piece of it.


Go though some examples.

## GUI
Here you can drag files and folders into the order that you want. Note that this does not allow you to move files or folders into new folders.


# Road map

- [x] Create a settings file.
- [x] Be able to add data to the settings tab.
- [ ] Have a gif to show how to use each command of the notes.
- [ ] Fully integrate the Folder Management section with the ability to move files to other vaults.
- [ ] Allow for the ability to export latex.
    - Include the ability to export a bib file too.

# Attributions

I copied the obsidian Icon svelte component from the quickadd plugin.
I copied the file suggest from  Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes . I did change the input options for a few suggests but it was more of a copy and replace than a new idea.

# Support

<a href="https://www.buymeacoffee.com/brmaccath" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
