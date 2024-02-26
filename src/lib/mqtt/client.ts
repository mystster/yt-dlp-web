import mqtt from 'mqtt';
import { PUBLIC_MQTT_WEBSOCKET_PORT } from '$env/static/public';

export const mqttClient = mqtt.connect(`ws://localhost:${PUBLIC_MQTT_WEBSOCKET_PORT}`, {
    protocolVersion: 3,
    protocol: 'ws'
});
mqttClient.once('connect', () => console.log('mqtt client connected'));
