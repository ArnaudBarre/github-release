import { readFileSync } from "fs";
import { join, dirname } from "path";
import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const root = process.env["GITHUB_WORKSPACE"]!;
    const path = core.getInput("path", { required: true });
    const { version } = require(join(
      dirname(join(root, path)),
      "package.json"
    ));
    const changelog = readFileSync(join(root, path), "utf-8");
    const [changelogHeader, ...body] = changelog
      .split("\n## ")
      [changelog.includes("\n## Unreleased") ? 2 : 1].split("\n");
    const changelogVersion = changelogHeader
      .slice(
        0,
        changelogHeader.indexOf("(") // Remove date when h2 is like 4.0.1 (2023-06-19)
      )
      .trim();
    if (changelogVersion !== version) {
      core.setFailed(
        `Changelog version (${changelogVersion}) doesn't match package.json version (${version})`
      );
      return;
    }
    const token = core.getInput("github-token", { required: true });
    const { data } = await github.getOctokit(token).rest.repos.createRelease({
      ...github.context.repo,
      name: `v${version}`,
      tag_name: `v${version}`,
      body: body.join("\n").trim(),
      prerelease: /\d-[a-z]/.test(version),
    });
    core.info(`Release created: ${data.html_url}`);
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
