import { LoginSchema } from '../types/LoginSchema';

import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };
    expect(loginReducer(state as LoginSchema, loginActions.setUsername('artur'))).toEqual({ username: 'artur' });
  });
  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('123'))).toEqual({ password: '123' });
  });
});
