# github-release

Simple GitHub action that generates a GitHub release from CHANGELOG.md

The expected format is:

```markdown
# Changelog

## 2.0.0

Some breaking changes

## 1.0.0

Initial release
```

Running this action with this file, the release name will be `v2.0.0` and the body `Some breaking changes`.
