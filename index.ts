import { readFileSync } from "fs";
import { join } from "path";
import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const root = process.env.GITHUB_WORKSPACE!;
    const { version } = require(join(root, "package.json"));
    const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf-8");
    const token = core.getInput("github-token", { required: true });
    const { data } = await github.getOctokit(token).rest.repos.createRelease({
      ...github.context.repo,
      name: `v${version}`,
      tag_name: `v${version}`,
      body: changelog.split("##")[1].split("\n").slice(1).join("\n").trim(),
    });
    core.info(`Release created: ${data.html_url}`);
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
