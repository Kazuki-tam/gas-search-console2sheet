/**
 * Gets a property store that all users can access, but only within this script.
 * @param {string} propertyName The Properties service
 * @return The property value
 * https://developers.google.com/apps-script/reference/properties/properties-service
 */

function getPropertiesService(propertyName: string) {
	const propertyValue: string | null =
		PropertiesService.getScriptProperties().getProperty(propertyName);
	if (!propertyValue) {
		Logger.log(`Error: ${propertyName} is not defined.`);
	}
	return propertyValue;
}

export { getPropertiesService };
