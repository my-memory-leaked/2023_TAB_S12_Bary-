export const INTEGER_PATTERN = /^-?\d+$/;
export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const ALL_NUMBERS_LETTERS_PATTERN = /^[a-zA-Z0-9]+$/;
export const USERNAME_PATTERN = /^.\S{4,17}$/;
export const PASSWORD_PATTERN = /^.\S{7,29}$/;

export const ADDRESS_CITY_PATTERN = /^[a-żA-Ż]+\-?[a-żA-Ż]+$/;
export const ADDRESS_STREET_PATTERN = /^[a-żA-Ż]+(\s?[a-żA-Ż]+)*$/;
export const ADDRESS_NUMBER_PATTERN = /^(?:[1-9]|\d{2,3}|[1-4]\d{3}|5000)$/;