const bcrypt = require('bcrypt');

class MockRepository {
  constructor() {
    this.data = [
      { id: 1, email: 'test@example.com', password: '$2b$10$N9qo8uLOickgx2ZMRZo5eP.EwVr3Cdf1PzJH7P0q4RG6FjAYVFn7e', role: 'user' }, // Contraseña "123456"
    ];
  }

  async findOne({ where }) {
    return this.data.find(user => user.email === where.email) || null;
  }
}

class MockJwtService {
  sign(payload) {
    return 'mockedJwtToken';
  }
}

(async function runTests() {
  const usuarioRepository = new MockRepository();
  const jwtService = new MockJwtService();

  const authService = {
    async validateUser({ email, password }) {
      const user = await usuarioRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('Usuario no encontrado.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta.');
      }

      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = jwtService.sign(payload);

      return {
        message: 'Inicio de sesión exitoso',
        accessToken: token,
        role: user.role,
        userId: user.id,
      };
    },
  };

  // Prueba 1: Credenciales válidas
  try {
    const result = await authService.validateUser({ email: 'test@example.com', password: '123456' });
    console.log('Prueba 1 (Credenciales válidas):', result);
  } catch (error) {
    console.error('Prueba 1 fallida:', error.message);
  }

  // Prueba 2: Usuario no encontrado
  try {
    const result = await authService.validateUser({ email: 'nonexistent@example.com', password: '123456' });
    console.log('Prueba 2 (Usuario no encontrado):', result);
  } catch (error) {
    console.error('Prueba 2 fallida:', error.message);
  }

  // Prueba 3: Contraseña incorrecta
  try {
    const result = await authService.validateUser({ email: 'test@example.com', password: 'wrongPassword' });
    console.log('Prueba 3 (Contraseña incorrecta):', result);
  } catch (error) {
    console.error('Prueba 3 fallida:', error.message);
  }
})();