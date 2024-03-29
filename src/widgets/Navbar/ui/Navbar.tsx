import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import CreateArticleIcon from '@/shared/assets/icons/createArticle.svg';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib';
import { ToggleFeature } from '@/shared/lib/featureFlags';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <ToggleFeature
        name='isAppRedesigned'
        off={
          <HStack max tagname='header' className={classNames(cls.navbar, [className], {})}>
            <TextDeprecated title='Blog App' className={cls.title} />
            <HStack tagname='nav' gap='16' className={cls.links}>
              <AppLinkDeprecated to={getRouteArticleCreate()}>{t('Create article')}</AppLinkDeprecated>
              <HStack gap='16'>
                <NotificationButton />
                <AvatarDropdown />
              </HStack>
            </HStack>
          </HStack>
        }
        on={
          <HStack gap='16' tagname='header' className={classNames(cls.navbarRedesigned, [className], {})}>
            <AppLink to={getRouteArticleCreate()} className={cls.createArticleLink}>
              <Icon Svg={CreateArticleIcon} />
            </AppLink>
            <NotificationButton />
            <AvatarDropdown />
          </HStack>
        }
      />
    );
  }

  return (
    <ToggleFeature
      name='isAppRedesigned'
      off={
        <HStack max tagname='header' className={classNames(cls.navbar, [className], {})}>
          <TextDeprecated title='Blog App' className={cls.title} />
          <ButtonDeprecated variant='clearInverted' className={classNames(cls.links)} onClick={onShowModal}>
            {t('Sign in')}
          </ButtonDeprecated>
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </HStack>
      }
      on={
        <>
          <Button variant='light' className={className} onClick={onShowModal}>
            {t('Sign in')}
          </Button>
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </>
      }
    />
  );
});
