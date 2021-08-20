# scrapbox-tools

Personal libraries to develop scrapbox user scripts.

## CLI

### how to use

#### Deploy UserScript or UserCSS

```shell
$ export TOKEN=your_login_token
$ scrapbox --project=${PROJECT_NAME} deploy-userscript ${JS_FILE_PATH}
$ scrapbox --project=${PROJECT_NAME} deploy-usercss ${CSS_FILE_PATH}
```

## Release

- publish command

  - `yarn release`

- unpublish command
  - `npm unpublish scrapbox-tools@$VERSION`
