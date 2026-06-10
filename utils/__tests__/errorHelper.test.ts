import { describe, it, expect } from '@jest/globals';
import { getFriendlyErrorMessage } from '../errorHelper';

describe('getFriendlyErrorMessage', () => {
  const defaultMsg = "Erro padrão.";

  it('should return default message if error is null or undefined', () => {
    expect(getFriendlyErrorMessage(null, defaultMsg)).toBe(defaultMsg);
    expect(getFriendlyErrorMessage(undefined, defaultMsg)).toBe(defaultMsg);
  });

  it('should return network connection error if error.response is missing', () => {
    const error = new Error('Network Error');
    expect(getFriendlyErrorMessage(error, defaultMsg)).toContain('Não foi possível conectar ao servidor');
  });

  it('should return internal server error message for 5xx status codes', () => {
    const error = {
      response: {
        status: 500,
        data: {}
      }
    };
    expect(getFriendlyErrorMessage(error, defaultMsg)).toContain('Ocorreu um erro interno no servidor');
  });

  it('should return incorrect credentials message for 401 status code', () => {
    const error = {
      response: {
        status: 401,
        data: {}
      }
    };
    expect(getFriendlyErrorMessage(error, defaultMsg)).toContain('E-mail/CPF ou senha incorretos');
  });

  it('should return forbidden access message for 403 status code', () => {
    const error = {
      response: {
        status: 403,
        data: {}
      }
    };
    expect(getFriendlyErrorMessage(error, defaultMsg)).toContain('Você não tem permissão');
  });

  it('should return not found message for 404 status code', () => {
    const error = {
      response: {
        status: 404,
        data: {}
      }
    };
    expect(getFriendlyErrorMessage(error, defaultMsg)).toContain('recurso solicitado não foi encontrado');
  });

  describe('Safe backend message extraction', () => {
    it('should return response data if it is a simple clean string', () => {
      const error = {
        response: {
          status: 400,
          data: "O e-mail informado já está em uso."
        }
      };
      expect(getFriendlyErrorMessage(error, defaultMsg)).toBe("O e-mail informado já está em uso.");
    });

    it('should return object message/error property if it is a clean string', () => {
      const errorWithMessage = {
        response: {
          status: 400,
          data: {
            message: "CPF inválido."
          }
        }
      };
      expect(getFriendlyErrorMessage(errorWithMessage, defaultMsg)).toBe("CPF inválido.");
    });

    it('should fall back to default message if backend message contains HTML tags', () => {
      const errorHTML = {
        response: {
          status: 400,
          data: "<html><body><h1>Bad Request</h1></body></html>"
        }
      };
      expect(getFriendlyErrorMessage(errorHTML, defaultMsg)).toBe(defaultMsg);
    });

    it('should fall back to default message if backend message contains stack traces or Exception keywords', () => {
      const errorException = {
        response: {
          status: 400,
          data: "NullReferenceException: Object reference not set to an instance of an object at BalancedLife.API.Controllers.LoginController.Login..."
        }
      };
      expect(getFriendlyErrorMessage(errorException, defaultMsg)).toBe(defaultMsg);
    });
  });
});
