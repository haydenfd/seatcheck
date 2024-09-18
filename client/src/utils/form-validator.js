import * as FormUtils from './form-utils';

/* Step 1 */

const urlValidator = (str) => {
    const regex = /^https:\/\/(www\.)?sa\.ucla\.edu\/ro\/Public\/SOC\/Results\/ClassDetail\?.+/;
    return regex.test(str);
}

const isValidCourseUrl = (url) => {
    const m_url = url.trim();
    if (!urlValidator(m_url)) 
        return false;
    
    const requiredParams = FormUtils.requiredURLParams;
    const urlObject = new URL(m_url);

    const searchParams = new URLSearchParams(urlObject.search);

    if (searchParams.size !== 5) {
        console.log("Invalid URL, too many query params");
        return false;
      }
  
    for (let [key, value] of searchParams.entries()) {
        if (!requiredParams.includes(key)) {
          console.log("Invalid param");
          return false;
        }
  
        if (key === "term_cd" && !FormUtils.validTerms.includes(value)) {
          console.log("invalid term");
          return false;
        }
      }

    return true;
}


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
    isValidCourseUrl,
    isValidEmail,
    isStringEmptyOrSpaces,
    emailMatchesConfirmationEmail
};
