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

const data = [
  {
    name: "123",
  },
  { name: "ABCD" },
  { name: "AbC", child: [{ name: 1243 }] },
  { name: "aBc.txt" },
  { name: "abcdefg", child: [{ name: "efg", child: [{ name: "hij.txt" }] }] },
  { name: "abcs" },
];

function sortTree(arrOfDirent: Dirent[]) {
  return arrOfDirent.toSorted((a, b) => {
    if (a.isFile() && !b.isFile()) return 1;
    if (!a.isFile() && b.isFile()) return -1;
    return 0;
  });
}

function isHidden(filename: string) {
  return /^\./.test(filename);
}

async function tree(path: string) {
  const listOfDir = await fs.readdir(path, { withFileTypes: true });
  const sortedDir = sortTree(listOfDir);

  let fileTree = "";

  sortedDir.forEach((dir) => {
    if (isHidden(dir.name)) return;

    fileTree += `|--${dir.name}\n`;
    if (dir.isDirectory()) {
      tree(path + "/" + dir.name).then((res) => {
        fileTree += res;
      });
    }
  });
  return fileTree;
}

async function main() {
  const path = "./test";
  try {
    let fileTree = path;
    let subTree = await tree(path);
    fileTree += `\n${subTree}`;
    console.log(fileTree);
  } catch (e) {
    console.error(e);
  }
}

main();

