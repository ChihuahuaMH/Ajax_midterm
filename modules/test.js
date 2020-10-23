function addition(a,b){
	return a+b;
}
function multiply(a,b){
	return a*b;
}

//module.exports = addition;
module.exports = {
	mult:multiply,
	add:addition
};