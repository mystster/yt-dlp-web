import { mqttClient } from "$lib/mqtt/client";

function worker() {
	console.log('Hello from worker');

	mqttClient.publish('test-topic', 'test with mqtt');
}

export default worker;
