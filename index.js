import fs from "node:fs/promises";

function sortTree(arrOfDirent) {
  return arrOfDirent.toSorted((a, b) => {
    return (b.isDirectory() ? 1 : 0) - (a.isDirectory() ? 1 : 0);
  });
}

async function tree(path) {
  const listOfDir = await fs.readdir(path, { withFileTypes: true });
  const sortedDir = sortTree(listOfDir);
  sortedDir.forEach(async (dir) => {
    //listOfDir.forEach(async (dir) => {
    let output = "|---";
    if (dir.isDirectory()) {
      console.log(output + dir.name);
      //await tree(path + "/" + dir.name);
    } else {
      console.log(output + dir.name);
    }
  });
}

async function main() {
  try {
    await tree(".");
  } catch (e) {
    console.error(e);
  }
}

main();
