import bcrypt from "bcrypt";

const criptgrafaString = async (str: string): Promise<string> => {
  return bcrypt.hash(str, 10);
};

const comparaString = async (
  strNormal: string,
  strCriptografa: string
): Promise<boolean> => {
  try {
    const resultado = bcrypt.compare(strNormal, strCriptografa);
    return resultado;
  } catch (e) {
    return false;
  }
};

export { criptgrafaString, comparaString };
