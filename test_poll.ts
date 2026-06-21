import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function run() {
  const tasks = await prisma.task.findMany({ where: { status: "pending" } });
  console.log("PENDING TASKS:", tasks);

  const now = new Date();
  console.log("NOW UTC:", now.toISOString());
  console.log("NOW LOCAL:", now.toString());

  for (const task of tasks) {
    if (!task.date) continue;
    let targetTimeStr = task.startTime || task.endTime;
    if (!targetTimeStr) continue;
    const dueDateTime = new Date(`${task.date}T${targetTimeStr}:00`);
    console.log(`Task ${task.title} - dueDateTime:`, dueDateTime.toISOString(), 'Local:', dueDateTime.toString());
    const timeDiffMs = dueDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiffMs / (1000 * 60 * 60);
    console.log(`hoursDiff:`, hoursDiff);
  }
}
run();
