export const getFriendlyErrorMessage = (error: any, defaultMessage: string = "Ocorreu um erro. Tente novamente."): string => {
  if (!error) return defaultMessage;

  // 1. Check if it's a network error or server is unreachable
  if (!error.response) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.";
  }

  const status = error.response.status;

  // 2. Server-side issues
  if (status >= 500) {
    return "Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.";
  }

  // 3. Unauthorized
  if (status === 401) {
    return "E-mail/CPF ou senha incorretos. Verifique suas credenciais e tente novamente.";
  }

  // 4. Forbidden
  if (status === 403) {
    return "Você não tem permissão para realizar esta ação.";
  }

  // 5. Not found
  if (status === 404) {
    return "O recurso solicitado não foi encontrado.";
  }

  // 6. Safe extraction from backend message
  const responseData = error.response.data;
  if (responseData) {
    // If it's a string, make sure it is not an HTML page, database error, or a stack trace
    if (typeof responseData === 'string') {
      const cleanStr = responseData.trim();
      if (
        cleanStr.length > 0 &&
        cleanStr.length < 150 &&
        !cleanStr.includes('<html>') &&
        !cleanStr.includes('<!DOCTYPE') &&
        !cleanStr.toLowerCase().includes('exception') &&
        !cleanStr.toLowerCase().includes('stacktrace') &&
        !cleanStr.toLowerCase().includes('stack trace') &&
        !cleanStr.toLowerCase().includes('sql')
      ) {
        return cleanStr;
      }
    }
    // If it's an object, check common property fields like message, error, or detail
    if (typeof responseData === 'object') {
      const possibleMessage = responseData.message || responseData.error || responseData.detail;
      if (typeof possibleMessage === 'string') {
        const cleanStr = possibleMessage.trim();
        if (
          cleanStr.length > 0 &&
          cleanStr.length < 150 &&
          !cleanStr.toLowerCase().includes('exception') &&
          !cleanStr.toLowerCase().includes('stacktrace') &&
          !cleanStr.toLowerCase().includes('stack trace') &&
          !cleanStr.toLowerCase().includes('sql')
        ) {
          return cleanStr;
        }
      }
    }
  }

  return defaultMessage;
};
