import fs from "node:fs/promises";
import sortTree from "./utils/sort-tree";
import isHidden from "./utils/hidden";
import { DOUBLE_LINE, SINGLE_LINE, SPACE, TREE } from "./constants";

//.
//├── 123
//├── ABCD
//├── AbC
//│   └── 1243
//├── aBc.txt
//├── abcdefg
//│   └── efg
//│       └── hij.txt
//└── abcs

type FileTree = {
  dirCount: number;
  fileCount: number;
  subTree: string;
};

const padding = "   ";
async function tree(path: string, indent: number = 0): Promise<FileTree> {
  const listOfDir = await fs.readdir(path, { withFileTypes: true });
  const sortedDir = sortTree(listOfDir);
  const len = sortedDir.length;

  if (len === 0) return { dirCount: 0, fileCount: 0, subTree: "" };

  let subTree = "";
  let dirCount = 0;
  let fileCount = 0;

  for (let i = 0; i < len; i++) {
    const dir = sortedDir[i];
    if (isHidden(dir.name)) continue;
    subTree += padding.repeat(indent);

    const isLast = i === len - 1;
    const prefix = isLast ? SINGLE_LINE : DOUBLE_LINE;

    subTree += `${prefix}${SPACE}${dir.name}\n`;

    if (dir.isDirectory()) {
      dirCount++;
      const res = await tree(path + "/" + dir.name, indent + 1);
      if (res.subTree.length) {
        subTree += TREE;
        subTree += res.subTree;
        dirCount += res.dirCount;
        fileCount += res.fileCount;
      }
    } else {
      console.log(dir.name, fileCount);
      fileCount++;
      console.log(fileCount);
    }
  }
  return {
    dirCount,
    fileCount,
    subTree,
  };
}

async function main() {
  const path = "./test";
  try {
    let fileTree = path;
    let res = await tree(path);
    fileTree += `\n${res.subTree}`;
    let dirCount = res.dirCount === 0 && res.fileCount === 0 ? res.dirCount : res.dirCount + 1;
    let fileCount = res.fileCount;
    console.log(fileTree);
    console.log(`${dirCount} directories, ${fileCount} files`);
  } catch (e) {
    console.error(e);
  }
}

main();
