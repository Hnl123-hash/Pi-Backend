import { decodeToken, verificaAuth } from "../auth/jwtService";

export const verificaAutorizacao = (
  token: string | undefined,
  roleNecessario: "ADMIN" | "USUARIO" | undefined,
  permissaoNecessaria: string | undefined
) => {
  if (!token) return false;
  const tokenDecodificado = decodeToken(token);

  if (
    permissaoNecessaria &&
    !tokenDecodificado.permissoes.includes(permissaoNecessaria)
  ) {
    return false;
  }

  if (roleNecessario && tokenDecodificado.role !== roleNecessario) {
    return false;
  }

  return verificaAuth(token);
};
