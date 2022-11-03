function isUAT() {
  return process.env.ENVIRONMENT_NAME === 'uat';
}

function getBranchName() {
  return process.env.BRANCH_NAME ? `/${process.env.BRANCH_NAME}/` : './';
}
function getBasePublicPath() {
  return isUAT() ? getBranchName() : '/';
}

module.exports = { getBasePublicPath, isUAT };
