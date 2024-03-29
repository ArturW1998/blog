import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import { classNames } from '@/shared/lib';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeature } from '@/shared/lib/featureFlags';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Loader } from '@/shared/ui/redesigned/Loader';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm: React.FC<LoginFormProps> = memo((props) => {
  const { className, onSuccess } = props;
  const dispatch = useAppDispatch();
  const forceUpdate = useForceUpdate();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const { t } = useTranslation();

  const loginHandler = useCallback(
    (val: string) => {
      dispatch(loginActions.setUsername(val));
    },
    [dispatch]
  );
  const passwordHandler = useCallback(
    (val: string) => {
      dispatch(loginActions.setPassword(val));
    },
    [dispatch]
  );

  const onButtonClick = useCallback(async () => {
    if (__PROJECT__ !== 'storybook') {
      const result = await dispatch(loginByUsername({ username, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        forceUpdate();
        onSuccess();
      }
    }
  }, [dispatch, forceUpdate, onSuccess, password, username]);

  const content = (
    <ToggleFeature
      name='isAppRedesigned'
      off={
        <VStack gap='16' className={classNames('', [className], {})}>
          <TextDeprecated title={t('authorization form')} className={cls.formTitle} />
          {isLoading && <Loader />}
          {error && (
            <TextDeprecated
              text={t('You entered an incorrect username or password')}
              theme='error'
              className={cls.formError}
            />
          )}
          <InputDeprecated
            onChange={loginHandler}
            value={username}
            variant='inverted'
            label={t('Enter login')}
            autoFocus
          />
          <InputDeprecated
            onChange={passwordHandler}
            value={password}
            variant='inverted'
            type='password'
            label={t('Enter password')}
          />
          <ButtonDeprecated
            disabled={isLoading}
            variant='outlined'
            onClick={onButtonClick}
            className={classNames(cls.loginBtn, [], { [cls.loading]: isLoading })}
          >
            {t('Sign in')}
          </ButtonDeprecated>
        </VStack>
      }
      on={
        <VStack gap='16' className={classNames('', [className], {})}>
          <Text title={t('authorization form')} className={cls.formTitle} />
          {isLoading && <Loader />}
          {error && (
            <Text text={t('You entered an incorrect username or password')} theme='error' className={cls.formError} />
          )}
          <Input onChange={loginHandler} value={username} label={t('Enter login')} autoFocus />
          <Input onChange={passwordHandler} value={password} type='password' label={t('Enter password')} />
          <Button
            disabled={isLoading}
            variant='outlined'
            onClick={onButtonClick}
            className={classNames(cls.loginBtn, [], { [cls.loading]: isLoading })}
          >
            {t('Sign in')}
          </Button>
        </VStack>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      {content}
    </DynamicModuleLoader>
  );
});

export default LoginForm;
