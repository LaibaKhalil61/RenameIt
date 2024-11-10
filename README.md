# RenameIt

A Node.js command-line tool to bulk rename files within a specified directory. This application helps automate the renaming of multiple files at once, making it easier to organize and manage files in bulk.

## Features

- **Bulk Rename**: Quickly rename all files in a specified directory based on a pattern or prefix.
- **File System Access**: Uses Node.js `fs` and `path` modules for efficient file handling.
- **Customizable Naming**: Easily specify a new name or pattern for the files.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LaibaKhalil61/RenameIt.git
   cd RenameIt
   ```
2. Usage
Run the application with the following command:

```bash

 node Filename --dir <DIRECTORY NAME> <--prefix <PREFIX> || --extension <EXTENSION> || --number >

```
DIRECTORY NAME: Path to the directory containing the files you want to rename.

PREFIX: New prefix or pattern to apply to each file in the directory.

EXTENSION: New extension to apply to each file in the directory.
