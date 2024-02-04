import { createServer } from "node:http";

const PORT = 3000;

function handleRequest(_request, response) {
	for (let index = 0; index < 1e7; index++);

	response.end(`Handled by ${process.pid}`);
}

const server = createServer(handleRequest)
	.listen(PORT)
	.once("listening", () => {
		console.log(
			`Server running at http://localhost:${PORT} in process ${process.pid}`,
		);
	});

function handleProcessExit() {
	console.log(`Server closing - ${new Date().toISOString()}`);
	server.close(() => process.exit());
}

process.on("SIGINT", handleProcessExit);
process.on("SIGTERM", handleProcessExit);
