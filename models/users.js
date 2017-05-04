const bcrypt = require('bcrypt-node');

module.exports = (Types, sequelize) => {
	//@doc: Model "User"
	// - disabled: deleted user

	return sequelize.define('users', {
		"firstName": {"type": Types.STRING(30), "allowNull": false},
		"lastName":	{"type": Types.STRING(30), "allowNull": false},
		"username": Types.STRING(25),
		"email": {"type": Types.STRING(50), "unique": true, "allowNull": false},
		"admin": {"type": Types.BOOLEAN, "defaultValue": false},
		"profileImg": Types.STRING(128),
		"disabled": {"type": Types.BOOLEAN, "defaultValue": false},
		"password":
		{
			type: Types.STRING,
			allowNull: true,
			set:  function(v) {
				let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(v, salt);
				this.setDataValue('password', hash);
			}
		}
	}, {
		classMethods: {
			validPassword: function(password, passwd, done, user){
				bcrypt.compare(password, passwd, function(err, isMatch){
					if (isMatch) {
						return done(null, user)
					} else {
						return done(null, false)
					}
				})
			}
		},
		instanceMethods: {
			comparePassword: function(candidatePassword, cb) {
				bcrypt.compare(candidatePassword, this.getDataValue('password'), function (err, isMatch) {
					if (err) {
						cb(err, false);
					}
					else {
						cb(null, isMatch);
					}
				});
			}
		}
	})
};
