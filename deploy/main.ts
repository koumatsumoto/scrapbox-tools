import { updateScrapboxUserScript } from './update-scrapbox-user-script';

(async () => {
  await updateScrapboxUserScript();
})()
  .then(() => {
    console.log('deploy completed');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
