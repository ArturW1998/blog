import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib';

import cls from './AppLink.module.scss';

type AppLinkTheme = 'primary' | 'secondary' | 'invertedPrimary' | 'invertedSecondary' | 'outlined';

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  target?: HTMLAttributeAnchorTarget;
}

/**
 * Outdated, use the new components from the redesigned folder
 * @deprecated
 */

export const AppLink: React.FC<AppLinkProps> = memo((props) => {
  const { className, children, to, theme = 'primary', target, ...otherProps } = props;

  return (
    <Link to={to} target={target} className={classNames(cls.appLink, [className, cls[theme]], {})} {...otherProps}>
      {children}
    </Link>
  );
});
