# Draft Manager
[![Version](https://img.shields.io/github/v/release/BrMacCath/DraftManager?include_prereleases&label=latest&logo=github&labelColor=green)](https://github.com/BrMacCath/DraftManager/releases)

This plugin is to help order writing drafts in Obsidian and how to manage the final product. This plugin will allow for different draft styles.

# What is the purpose of this plugin

I think Obisidian is a great tool to store notes and to writing but I found that having a vault for both purposes led to me getting overwhelmed. 


# Set up

## Name vaults that you can move files to

State the vaults that you wish to be able to transfer files to. Right now there is no method to check that the vault listed is a valid vault. If you try to move files to a vault that does not exist you will just get an error message. A gif to show how to add vaults is below.
<img src="/Gifs/AddVault.gif" />

## Make Default draft conditions

There is a selection of draft types that can be used with this plugin. Explanations of the draft styles are in the next section. 

### Go through each section

### File prep to use the draft conditions

# Moving Files

There are two methods of moving files in this plugin. They require that you set up which vaults you can move them to.

## Move entire folder using a command

If you want to move all the files within a folder without any changes, you can use a command to do do this. A gif is presented below.
<img src="/Gifs/MoveFilesToVault.gif" />

# Draft Styles

## Blank

This draft style updates the frontmatter and adds the next draft number title to the page.

## Peterson-Walt-Frontmatter

# Frontmatter
This will decide how the frontmatter of each option will be taken.

# Move Type

This will decide how the content of the file will be taken

## As Is

Take the entire file.

## Last Version

This uses the last version of your writing. It will get rid of things that are not Frontmatter.

# Folder Updates

With the folder updates section, you can control how you want files to be processed and in what order.

## GUI
Here you can drag files and folders into the order that you want. Note that this does not allow you to move files or folders into new folders.

## Compile output

Here you can use the files in a folder to be combined to make a new file in one of the files. This can be the entire file or just a piece of it.

# Road map

- [x] Create a settings file.
- [x] Be able to add data to the settings tab.
- [ ] Have a gif to show how to use each command of the notes.
- [ ] Fully integrate the Folder Management section with the ability to move files to other vaults.
- [ ] Allow for the ability to export latex.
    - Include the ability to export a bib file too.

# Attributions

I copied the obsidian Icon from the quickadd plugin.
I copied the file suggest from  Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes . I did change the input options for a few suggests but it was more of a copy and replace than a new idea.

# Support

<a href="https://www.buymeacoffee.com/brmaccath" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
