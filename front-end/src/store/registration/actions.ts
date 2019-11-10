export const OPEN_REGISTRATION_MODAL = 'OPEN_REGISTRATION_MODAL';
export const CLOSE_REGISTRATION_MODAL = 'CLOSE_REGISTRATION_MODAL';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export const openRegistrationModal = () => {
  return {
    type: OPEN_REGISTRATION_MODAL,
  };
};

export const closeRegistrationModal = () => {
  return {
    type: CLOSE_REGISTRATION_MODAL,
  };
};

export const registrationError = (errorMessage: string) => {
  return {
    type: REGISTRATION_ERROR,
    payload: errorMessage,
  };
};
