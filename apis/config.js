const mysql = require("mysql2")
const util = require("util")

const readPool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "nodemysqlcrudapi",
	port: 3306,
	password: "iamanfoot1998#",
	waitForConnections: true,
	connectionLimit: 5,
	queueLimit: 0,
	multipleStatements: true
})

const writePool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "nodemysqlcrudapi",
	port: 3306,
	password: "iamanfoot1998#",
	waitForConnections: true,
	connectionLimit: 5,
	queueLimit: 0,
	multipleStatements: true
})

readPool.query = util.promisify(readPool.query)
writePool.query = util.promisify(writePool.query)

module.exports = { readPool, writePool }