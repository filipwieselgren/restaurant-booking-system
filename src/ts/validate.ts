export const validateLength = (v: string, l: number) => {
  if (v.length === l) {
    return true;
  } else {
    return false;
  }
};

export const validateEmailCall = (email: string) => {
  let regex = /\S+@\S+\.\S+/.test(email);

  if (regex) {
    return true;
  } else {
    return false;
  }
};
