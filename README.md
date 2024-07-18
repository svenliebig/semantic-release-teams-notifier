# semantic-release-teams-notifier

[semantic-release](https://github.com/semantic-release/semantic-release) plugin to send notifications about new versions to teams channels.

## Install

```shell
npm install semantic-release-teams-notifier -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration)

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "docs/CHANGELOG.md"
      }
    ],
    [
      "semantic-release-teams-notifier",
      {
        "teamsWebhook": ["https://outlook..."]
      }
    ]
  ]
}
```
