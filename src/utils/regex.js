const hasLeastOneUppercase = /[A-Z]/;
const hasLeastOneLowercase = /[a-z]/;
const hasLeastOneLowercaseOneUppercase = /[a-z][A-Z]/;
const hasLeastOneNumber = /[0-9]/;
const preventSpace = /^[a-z0-9_]/;
const inRange6to15 = /^.{6,15}$/;
const inRange5to64 = /^.{5,64}$/;

export {
  hasLeastOneUppercase,
  hasLeastOneLowercase,
  hasLeastOneLowercaseOneUppercase,
  hasLeastOneNumber,
  preventSpace,
  inRange6to15,
  inRange5to64,
};
