# page_to_md

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

```sh
bun build src/content.ts --outfile content.js --target browser --external chrome
bun build src/background.ts --outfile background.js --target browser --external chrome
```
bun build src/content.ts --outfile content.js --target node --external chrome
bun build src/background.ts --outfile background.js --target node --external chrome

🔧 --external chrome tells Bun not to bundle the chrome.* extension APIs.