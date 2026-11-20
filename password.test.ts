import { describe, expect, it } from 'vitest';
import { comparePassword, hashPassword } from '../../../src/utils/password.util';

describe('password.util', () => {
  const password1 = 'ClaveUno123!';
  const password2 = 'ClaveDos456!';

  it('genera hashes no vacíos y distintos de las contraseñas originales', async () => {
    const hash1 = await hashPassword(password1);
    const hash2 = await hashPassword(password2);

    expect(hash1).toBeTypeOf('string');
    expect(hash1).not.toBe('');
    expect(hash1).not.toBe(password1);
    expect(hash2).toBeTypeOf('string');
    expect(hash2).not.toBe('');
    expect(hash2).not.toBe(password2);
  });

  it('devuelve true al comparar cada contraseña con su hash', async () => {
    const hash1 = await hashPassword(password1);
    const hash2 = await hashPassword(password2);

    await expect(comparePassword(password1, hash1)).resolves.toBe(true);
    await expect(comparePassword(password2, hash2)).resolves.toBe(true);
  });

  it('devuelve false al comparar una contraseña con el hash de la otra', async () => {
    const hash1 = await hashPassword(password1);
    const hash2 = await hashPassword(password2);

    await expect(comparePassword(password2, hash1)).resolves.toBe(false);
    await expect(comparePassword(password1, hash2)).resolves.toBe(false);
  });
});

