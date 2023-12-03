import express, { Router } from 'express';
import path from 'path';

interface IOptions {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: IOptions) {
    const { port, routes, publicPath = 'public' } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //* midlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* public folders
    this.app.use(express.static(`./${this.publicPath}/backup`));

    // * Routes
    this.app.use(this.routes);

    // * SPA
    this.app.get('*', (req, res) => {
      console.log(req.url);

      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/backup`,
        'index.html'
      );
      res.sendFile(indexPath);
      return;
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
