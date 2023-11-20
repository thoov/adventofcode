import fg from 'fast-glob';

type ImportType = typeof import("./day-1/index");

(async function() {
  const days = await fg.glob(['day-*'], { onlyDirectories: true });
  const promises = days.map(async (day) => {
    let { solve } = (await import(`./${day}/index`) as ImportType);
    const bunFile = Bun.file(Bun.resolveSync(`./${day}/input.txt`, import.meta.dir));
    const input = await bunFile.text();
    const lines = input.split("\n");
    return solve(lines);
  });

  const answers = await Promise.allSettled(promises);
  answers.forEach((answer, index) => {
    if (answer.status === 'fulfilled') {
      console.log(`Day ${index + 1}: ${answer.value}`);
    } else {
      console.log(`Day ${index + 1}: ${answer.reason}`);
    }
  });
})();