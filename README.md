# github-release

Simple GitHub action that generates a GitHub release from `CHANGELOG.md`.

The expected format is:

```markdown
# Changelog

## 2.0.0

Some breaking changes

## 1.0.0

Initial release
```

Running this action with this file will create a release named `v2.0.0` with the body `Some breaking changes`.

## Usage

```yml
steps:
  - uses: actions/checkout@v2
  - uses: ArnaudBarre/github-release@v1
```
