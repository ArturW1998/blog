import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './Input';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/const/Theme';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  label: 'Text',
  value: 'text',
};
export const Readonly = Template.bind({});
Readonly.args = {
  label: 'Text',
  value: 'text',
  readonly: true,
};

export const Clear = Template.bind({});
Clear.args = {
  variant: 'clear',
  label: 'Text',
  value: 'text',
};
export const Inverted = Template.bind({});
Inverted.args = {
  variant: 'inverted',
  label: 'Text',
  value: 'text',
};

export const Dark = Template.bind({});
Dark.args = { label: 'Text', value: 'text' };

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Blue = Template.bind({});
Blue.args = { label: 'Text', value: 'text' };

Blue.decorators = [ThemeDecorator(Theme.BLUE)];
