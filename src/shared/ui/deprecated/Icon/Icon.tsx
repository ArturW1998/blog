import { FC, memo, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

/**
 * Outdated, use the new components from the redesigned folder
 * @deprecated
 */

export const Icon: FC<IconProps> = memo((props) => {
  const { Svg, className, inverted, ...otherProps } = props;

  return <Svg className={classNames(inverted ? cls.inverted : cls.icon, [className], {})} {...otherProps} />;
});
