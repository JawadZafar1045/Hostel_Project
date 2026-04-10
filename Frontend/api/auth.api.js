const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_USER = {
  email: 'demo@example.com',
  password: 'password123',
  token: 'mock-jwt-token-123456789',
  role: 'student',
  fullName: 'Demo User',
  phone: '03001234567'
};

export const loginUser = async (data) => {
  await delay(1000);

  if (data.email === MOCK_USER.email && data.password === MOCK_USER.password) {
    return {
      success: true,
      token: MOCK_USER.token,
      user: {
        email: MOCK_USER.email,
        name: MOCK_USER.fullName,
        role: MOCK_USER.role,
        phone: MOCK_USER.phone
      }
    };
  }

  if (data.email && data.password.length >= 8) {
    return {
      success: true,
      token: `mock-token-${Date.now()}`,
      user: {
        email: data.email,
        name: 'Mock User',
        role: 'student',
        phone: '00000000000'
      }
    };
  }

  throw new Error('Invalid email or password');
};

export const registerStudent = async (data) => {
  await delay(1000);

  return {
    success: true,
    message: 'Student registered successfully',
    user: {
      email: data.email,
      name: data.fullName,
      phone: data.phone,
      role: 'student'
    }
  };
};

export const registerOwner = async (data) => {
  await delay(1000);

  return {
    success: true,
    message: 'Owner registered successfully',
    user: {
      email: data.email,
      name: data.fullName,
      phone: data.phone,
      role: 'owner'
    }
  };
};
