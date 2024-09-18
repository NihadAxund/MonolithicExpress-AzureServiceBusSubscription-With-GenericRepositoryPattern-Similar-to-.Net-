import { exec } from 'child_process';

async function myfuncionstart() {


    await new Promise((resolve, reject) => {
        exec('npm install', (error, stdout, stderr) => {
            console.log("npm install start");
            if (error) {
                console.error(`npm install error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`npm install error: ${stderr}`);
                reject(stderr);
                return;
            }
            console.log(`npm install output: ${stdout}`);
            resolve();
        });
    });
    const { startServer } = await import('./server.js');


    console.log("---------------------------------------------");

    setTimeout(async () => {
        await startServer().catch(error => {
            console.error("error server:", error);
        });
    }, 1500);
}


myfuncionstart();

