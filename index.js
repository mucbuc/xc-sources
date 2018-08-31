#!/usr/bin/env node

const cp = require("child_process"),
  argv = require("yargs")
    .usage("Usage: xc-sources --project [project] --scheme [scheme] --arch [arch]")
    .demandOption(["project", "scheme"])
    .default("arch", "arm64").argv;

cp.exec(
  `xcodebuild -dry-run -project ${argv.project} -scheme ${argv.scheme} ARCH=${
    argv.arch
  } ONLY_ACTIVE_ARCH=NO`,
  { stdio: "pipe" },
  (error, stdout, stderr) => {
    var match,
      regex = /\s-c\s+(.*)?\s+-o\s/g;
    while (match = regex.exec(stdout)) {
      console.log(match[1]);
    }
  }
);