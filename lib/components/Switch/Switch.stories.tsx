import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { useSelect } from "@lib/utilities/use-select";
import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";

import { Switch, SwitchProps } from "./Switch";

export default {
  title: "Switch",
  component: Switch,
} as Meta;

const switchStyle = css`
  ${Switch.Item}[data-selected] {
    color: ${(props) => props.theme.colors.blue};
    background-color: ${(props) => props.theme.colors.background[3]};
  }

  ${Switch.Item} {
    background-color: ${(props) => props.theme.colors.background[4]};
    border-radius: ${(props) => props.theme.border.radius.small};
    padding: ${(props) => props.theme.spacing.baseTight}
      ${(props) => props.theme.spacing.base};
    transition: all ${(props) => props.theme.duration.fastest} ease;
  }
`;

export const TwoSettings: Story<SwitchProps> = (args) => {
  const items = ["one", "two"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box $width="20rem">
        <Switch css={switchStyle} selection={selection} onSelect={select}>
          <Switch.Item id="one">
            <TextBox>One</TextBox>
          </Switch.Item>
          <Switch.Item id="two">
            <TextBox>Two</TextBox>
          </Switch.Item>
        </Switch>
      </Box>
    </AppProvider>
  );
};

export const ThreeSettings: Story<SwitchProps> = (args) => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box $width="20rem">
        <Switch css={switchStyle} selection={selection} onSelect={select}>
          <Switch.Item id="one">
            <TextBox>One</TextBox>
          </Switch.Item>
          <Switch.Item id="two">
            <TextBox>Two</TextBox>
          </Switch.Item>
          <Switch.Item id="three">
            <TextBox>Three</TextBox>
          </Switch.Item>
        </Switch>
      </Box>
    </AppProvider>
  );
};
