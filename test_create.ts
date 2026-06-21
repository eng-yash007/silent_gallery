import { pollAndCreateNotifications } from "./src/app/actions/notifications";
async function run() {
  const res = await pollAndCreateNotifications();
  console.log(res);
}
run();
