'use strict'
const env       = process.env.NODE_ENV || 'development'
const config    = require('./database.json')[env]
const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const User = require('../models/users')(Sequelize, sequelize)
const Settings = require('../models/settings')(Sequelize, sequelize)

sequelize.sync()

const db = {
	"Sequelize": Sequelize,
	"sequelize": sequelize,

	"models": {
		User, Settings
	}
}

module.exports = db
