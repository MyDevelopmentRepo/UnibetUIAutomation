export default {
  selectPromotion: {
    promotion: "div[data-kmf ='welcome-bonus-offer' ] div[data-dn='bonus-offer']",
    SubmitButton: "button[data-test-name ='submit-button']",
    skip: "a[data-test-name ='skip-welcome-bonus-offer-link']"
  },

  createAccount: {
    registerationForm: "div[data-test-name='registration-kmf-mini-app'] form",
    progressBubble: "div[data-test-name='progress-bar-bubble']",
    firstName: "input[name='firstName']",
    lastName: "input[name='lastName']",
    email: "input[name='email']",
    emailErrorMsg: "div[data-test-name ='email-error-message']",
    emailSuccessIcon: "svg[data-test-name='email-success-icon']",
    passsword: "input[name='password']",
    dateDropdown: "div[data-test-name='dropdown-dateVal']",
    dateSelect: "select[name='dateVal']",
    monthDropdown: "div[data-test-name='dropdown-monthVal']",
    monthSelect: "select[name='monthVal']",
    yearDropdown: "div[data-test-name='dropdown-yearVal']",
    yearSelect: "select[name='yearVal']",
    genderDropdown: "div[data-test-name='gender-drop-down']",
    genderSelect: "select[name='gender']",
    continueButton: "button[data-test-name='submit-button']",
    progressBubbleSvg: "div[data-test-name='progress-bar-bubble'] svg"

  }

}
