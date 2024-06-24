import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number,
    routes: Router,
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;


    constructor(options: Options) {
        const {
            port,
            routes,
            public_path = 'public'
        } = options;
        this.port = port;
        this.routes = routes
        this.publicPath = public_path
    }


    async start() {

        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));


        //Public folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);


        // SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        })



        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${3000}`);
        });
    }



}