// Initialize the clamscan module
const NodeClam = require('../index.js'); // Offically: require('clamscan');

const ClamScan = new NodeClam().init({
    debug_mode: false,
    clamdscan: {
        // Run scan using command line
        path: '/usr/bin/clamdscan',                // <-- Secondary fallback to command line -|
        config_file: '/etc/clamd.d/daemon.conf',   // <---------------------------------------|
        // Connect via Host/Port
        host: 'localhost',                         // <-- Primary fallback - |
        port: 3310,                                // <----------------------|
        // Connect via socket (preferred)
        socket: '/var/run/clamd.scan/clamd.sock',  // <-- Preferred connection method
        active: true,                              // Set to 'false' to test getting version info from `clamscan`
    },
    clamscan: {
        path: '/usr/bin/clamscan',                 // <-- Worst-case scenario fallback
    },
    preference: 'clamdscan',                        // Set to 'clamscan' to test getting version info from `clamav`
});

ClamScan.then(async av => {
    const result = await av.get_version();
    console.log("Version: ", result);
});
