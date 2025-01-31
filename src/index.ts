import type { Dirent } from "node:fs";
import fs from "node:fs/promises";

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

function sortTree(arrOfDirent: Dirent[]) {
  return arrOfDirent.toSorted((a, b) => {
    if (a.isFile() || b.isFile()) {
      if (a.isFile() && !b.isFile()) return 1;
      if (!a.isFile() && b.isFile()) return -1;
      return 0;
    } else {
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    }
  });
}

function isHidden(filename: string) {
  return /^\./.test(filename);
}

const padding = "   ";
async function tree(path: string, indent: number = 0) {
  const listOfDir = await fs.readdir(path, { withFileTypes: true });
  const sortedDir = sortTree(listOfDir);
  let test = "";
  for (const dir of sortedDir) {
    if (isHidden(dir.name)) continue;
    test += padding.repeat(indent);
    test += `|--${dir.name}\n`;
    if (dir.isDirectory()) {
      const res = await tree(path + "/" + dir.name, indent + 1);
      if (res.length) {
        test += res;
      }
    }
  }
  return test;
}

async function main() {
  const path = "./test";
  try {
    let fileTree = path;
    let subTree = await tree(path);
    fileTree += `\n${subTree}`;
    console.log(subTree);
  } catch (e) {
    console.error(e);
  }
}

main();
