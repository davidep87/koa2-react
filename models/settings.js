module.exports = (Types, sequelize) => {
	//@doc: Model "Settings"

	return sequelize.define('settings', {
    "sitename": {"type": Types.STRING(255), "allowNull": false},
		"title": {"type": Types.STRING(255), "allowNull": true},
		"description": {"type": Types.TEXT(), "allowNull": false},
		"main_email": {"type": Types.STRING(255), "allowNull": false},
		"facebook": {"type": Types.STRING(255), "allowNull": false},
		"twitter": {"type": Types.STRING(255), "allowNull": false},
		"linkedin": {type: Types.STRING(255), "allowNull": false, "defaultValue": false},
		"image": {type: Types.STRING(255), "allowNull": true}
	});
};
