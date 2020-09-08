const Router = require('koa-router');
const router = new Router();
var sqlite3 = require('sqlite3').verbose();


router.get('/', async (ctx) => {
    ctx.body = `Seu servidor esta rodando em http://localhost:3000`;
});

db = new sqlite3.Database('./DataBase/users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

var data = [],
    records = [];

function getData() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            rows.forEach((row) => {
                data.push(row);
            });

            resolve(data);
        })
    })
}

var dataName = [],
    recordsName = [];
function getDatabyName(name) {
    return new Promise((resolve, reject) => {
    db.all(`SELECT nome, email, idade FROM users WHERE nome ="${name}" ;` , [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            rows.forEach((row) => {
                dataName.push(row);
            });

            resolve(dataName);
        })
    })
}

(async function() {
    records = await getData();
})()



router.get('/users', async ctx => {
    try {
        console.error(e);
    } catch (e) {
        
        ctx.status = 200;
        ctx.body = {
            rows: records
        }
    }
}),

(async function() {
	router.get('/users:name', async ctx => {
		let {url} = ctx;
		let splitter = url.split(':');
		recordsName = await getDatabyName(splitter[1]);
		try {
			ctx.status = 200;
			ctx.body = {
				usuario: recordsName
			}
		} catch (e) {
			console.error(e);

		}
	})
})()

router.post('/users', async ctx => {
        let {idade,
            name,
            email
        } = ctx.request.body;
        try {
            ctx.status = 201;
            db.run(`INSERT INTO users VALUES (${idade},"${name}","${email}");`, function(err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        } catch (e) {
            console.error(e);
        }
    })

    .delete('/users:name', async ctx => {
		let {url} = ctx;
		let splitter = url.split(':');
        try {
            ctx.status = 200;
            db.run(`DELETE FROM users WHERE nome ="${splitter[1]}";`, function(err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        } catch (e) {
            console.error(e);
        }
    })

    .put('/users', async ctx => {
        let {
            idade,
            newname,
            email,
            name
        } = ctx.request.body;
        try {
            ctx.status = 200;
            db.run(`UPDATE users SET idade =${idade}, nome = "${newname}",email="${email}" WHERE nome = "${name}";`, function(err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        } catch (e) {
            console.error(e);
        }
    });

module.exports = router;.
