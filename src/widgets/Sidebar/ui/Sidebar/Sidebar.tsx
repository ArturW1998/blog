import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { getSidebarItemsList } from '../../model/selectors/getSidebarItemsList';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwither } from '@/features/ThemeSwither';
import ArrowDown from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib';
import { ToggleFeature } from '@/shared/lib/featureFlags';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = memo((props) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItemsList);

  const toggleHandler = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () => sidebarItemsList.map((item) => <SidebarItem item={item} key={item.path} collapsed={collapsed} />),
    [collapsed, sidebarItemsList]
  );

  return (
    <ToggleFeature
      name='isAppRedesigned'
      off={
        <div data-testid='sidebar' className={classNames(cls.sidebar, [className], { [cls.collapsed]: collapsed })}>
          <VStack tagname='nav' align='start' gap='16' className={classNames(cls.items)}>
            {itemsList}
          </VStack>
          <ButtonDeprecated
            square
            size='large'
            variant='backgroundInverted'
            data-testid='sidebar-toggle'
            className={cls.toggleButton}
            onClick={toggleHandler}
          >
            {collapsed ? '>' : '<'}
          </ButtonDeprecated>
          <HStack max gap='16' justify='center' className={cls.switchers}>
            <ThemeSwither />
            <LangSwitcher short={collapsed} />
          </HStack>
        </div>
      }
      on={
        <div
          data-testid='sidebar'
          className={classNames(cls.sidebarRedesigned, [className], { [cls.collapsedRedesigned]: collapsed })}
        >
          <AppLogo size={collapsed ? 30 : 50} className={cls.logoRedesigned} />
          <VStack tagname='nav' align='start' gap='8' className={classNames(cls.itemsRedesigned)}>
            {itemsList}
          </VStack>
          <Icon
            data-testid='sidebar-toggle'
            className={cls.toggleButtonRedesigned}
            onClick={toggleHandler}
            clickable
            Svg={ArrowDown}
          />
          <HStack max justify='center' className={cls.switchers}>
            <ThemeSwither />
            <LangSwitcher short={collapsed} />
          </HStack>
        </div>
      }
    />
  );
});
