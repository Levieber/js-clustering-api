import os from "node:os";
import cluster from "node:cluster";

if (cluster.isPrimary) {
	runPrimaryProcess();
} else if (cluster.isWorker) {
	runWorkerProcess();
}

function runPrimaryProcess() {
	const processesCount = os.cpus().length * 2;
	console.log(
		`Primary ${process.pid} is rhttps://youtu.be/50-9uorSYw0?si=B2l5h_YWhhyAyVBDunning`,
	);
	console.log(`Forking server with ${processesCount} processes\n`);

	for (let index = 0; index < processesCount; index++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			console.log(
				`Worker ${worker.process.pid} died... Scheduling another one`,
			);
			cluster.fork();
		}
	});
}

async function runWorkerProcess() {
	await import("./server.js");
}
