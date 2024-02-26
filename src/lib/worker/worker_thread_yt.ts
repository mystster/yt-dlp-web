import mqtt from 'mqtt'; // import namespace "mqtt"

function worker() {
	console.log('Hello from worker');

	const client = mqtt.connect('ws://localhost:1883');
	client.on('connect', () => {
		client.publish('test-topic', 'test with mqtt');
	});
}

export default worker;
