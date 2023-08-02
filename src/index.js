const express = require('express');
const hdb = require('express-handlebars');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const route = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app /middlewares/SortMiddleware');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,

    }),
);

app.use(methodOverride('_method'));

app.use(SortMiddleware);

app.engine(
    'hbs',
    hdb.engine({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default : 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }
                const types = {
                    default : 'desc',   
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];

                return ` <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`
            }
        }       
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'res','views'));

route(app);

app.listen(3000, function () {
    console.log('App listening at http://localhost:3000');
});
