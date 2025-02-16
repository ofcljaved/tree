# tree

A command-line tool to display a tree-like directory structure, inspired by the `tree` command in Linux.

## Installation

You can install `tree` globally using your preferred package manager:

### npm

```bash
npm install -g @ofcljaved/tree
```

### yarn

```bash
yarn global add @ofcljaved/tree
```

### pnpm

```bash
pnpm install -g @ofcljaved/tree
```

### bun

```bash
bun add -g @ofcljaved/tree
```

## Usage

After installing globally, you can run the `tree` command from any directory in your terminal:

```bash
tree [directory] [options]
```

*   `directory`: (Optional) The directory to display as a tree. Defaults to the current directory if not specified.
*   `options`: (Optional) Various options to customize the output. See the "Options" section below.

## Example

To display the tree structure of the current directory:

```bash
tree
```

To display the tree structure of a specific directory:

```bash
tree /path/to/your/directory
```

## Options

_(Coming Soon)_

Currently, no options are implemented.  Future versions will include options to customize the output, such as:

*   `-a`: Show hidden files and directories.
*   `-d`: Only show directories.
*   `-L level`:  Descend only *level* directories deep.
*   And more!

## Contributing

Contributions are welcome!  This project is currently in its early stages.  See `ts/` for the TypeScript implementation.  Go and Rust implementations are planned.

## License

[MIT](LICENSE)
