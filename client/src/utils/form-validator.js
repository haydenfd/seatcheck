/* Step 3 */

const isValidEmail = (param_email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(param_email);
  };

const isStringEmptyOrSpaces = (param_string) => {
    return param_string === "" || param_string.match(/^ *$/) !== null;
}

const emailMatchesConfirmationEmail = (email, confirmation_email) => {
    return email.trim() === confirmation_email.trim();
}

export {
    isValidEmail,
    isStringEmptyOrSpaces,
    emailMatchesConfirmationEmail
};
