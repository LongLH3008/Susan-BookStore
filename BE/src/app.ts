import Express from "./providers/Express";
import Database from "./providers/Database";

class App{
    public loadDatabase (){
        Database.init();
    }
    public loadServer(){
        Express.init();
    }
}

(new App).loadDatabase();
(new App).loadServer();




// import express, { Request, Response } from 'express';
// import { configDotenv } from 'dotenv';
// import morgan from 'morgan';
// import helmet from 'helmet';

// const app = express();
// configDotenv();

// app.set('view engine', "ejs")
//    .set('views', "views")
//    .use(express.urlencoded({extended: false}))
//    .use(express.json())
//    .use(morgan('short'))
//    .use(express.static('public'))
//    .use(helmet())

   
// app.get('/', async(req: Request, res: Response) => {
//     return res.render('index', {mes : "Hello World"});
// })

// const port = process.env.PORT || 5000;
// app.listen(port, ()=> console.log(`Server is running on port ${port}`));
