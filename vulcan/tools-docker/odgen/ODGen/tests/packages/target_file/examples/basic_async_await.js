const request = require('request');
const fs = require('fs');
const fake_virus_url = 'https://secure.eicar.org/eicar_com.txt';
const normal_file_url = 'https://raw.githubusercontent.com/kylefarris/clamscan/sockets/README.md';
const temp_dir = __dirname;
const scan_file = `${temp_dir}/tmp_file.txt`;
//const test_file = normal_file_url;
const test_file = fake_virus_url;

const config = {
    remove_infected: true,
    debug_mode: false,
    scan_recursively: false,
    clamdscan: {
        path: '/usr/bin/clamdscan',
        // config_file: '/etc/clamd.d/daemon.conf'
    },
    preference: 'clamdscan'
};

// Initialize the clamscan module
const NodeClam = require('../index.js'); // Offically: require('clamscan');

;(async () => {
    const clamscan = await new NodeClam().init(config);

    // Request a test file from the internet...
    request(test_file, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
            // Write the file to the filesystem
            fs.writeFileSync(scan_file, body);

            // Scan the file
            try {
                const {file, is_infected, viruses} = await clamscan.is_infected(scan_file);

                // If `is_infected` is TRUE, file is a virus!
                if (is_infected === true) {
                    console.log(`You've downloaded a virus (${viruses.join('')})! Don't worry, it's only a test one and is not malicious...`);
                } else if (is_infected === null) {
                    console.log("Something didn't work right...");
                } else if (is_infected === false) {
                    console.log(`The file (${file}) you downloaded was just fine... Carry on...`);
                }

                // Remove the file (for good measure)
                if (fs.existsSync(scan_file)) fs.unlinkSync(scan_file);
                process.exit(0);
            } catch (err) {
                console.error("ERROR: " + err);
                console.trace(err.stack);
                process.exit(1);
            }
        } else {
            console.log("Could not download test virus file!");
            console.error(error);
            process.exit(1);
        }
    });
})();
