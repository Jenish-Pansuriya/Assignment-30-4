const protocol = 'http';
const host = '192.168.1.15';
const port = '8080';
const trailUrl = 'api';

const hostUrl = `${host}/`;
const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}`;
// const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}/${trailUrl}`;
// const endpoint = `${host}/${trailUrl}`;

export default {
    // protocol: protocol,
    host: host,
    // port: port,
    apiUrl: trailUrl,
    endpoint: endpoint,
    hostUrl: hostUrl,
};