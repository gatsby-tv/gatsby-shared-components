import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { useSelect } from "@lib/utilities/use-select";
import { AppProvider } from "@lib/components/AppProvider";
import { TextBox } from "@lib/components/TextBox";
import { Box } from "@lib/components/Box";

import { Selection, SelectionProps } from "./Selection";

export default {
  title: "Selection",
  component: Selection,
} as Meta;

const selectionStyle = css`
  ${Selection.Item}[data-selected] {
    color: ${(props) => props.theme.colors.blue};
    background-color: ${(props) => props.theme.colors.background[3]};
  }

  ${Selection.Item} {
    padding: ${(props) => props.theme.spacing.baseTight}
      ${(props) => props.theme.spacing.base};
    transition: all ${(props) => props.theme.duration.fastest} ease;
  }

  ${Selection.Section.Title} {
    padding: ${(props) => props.theme.spacing.tight}
      ${(props) => props.theme.spacing.base};
  }
`;

const wrapperStyle = css`
  background-color: ${(props) => props.theme.colors.background[4]};
`;

export const OneSection: Story<SelectionProps> = (args) => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} $width="20rem">
        <Selection
          scrollHidden
          css={selectionStyle}
          selection={selection}
          onSelect={select}
        >
          <Selection.Section>
            <Selection.Item id="one">
              <TextBox>One</TextBox>
            </Selection.Item>
            <Selection.Item id="two">
              <TextBox>Two</TextBox>
            </Selection.Item>
            <Selection.Item id="three">
              <TextBox>Three</TextBox>
            </Selection.Item>
          </Selection.Section>
        </Selection>
      </Box>
    </AppProvider>
  );
};

export const MultipleSections: Story<SelectionProps> = (args) => {
  const items = ["one", "two", "three", "four", "five"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} $width="20rem">
        <Selection
          scrollHidden
          css={selectionStyle}
          selection={selection}
          onSelect={select}
        >
          <Selection.Section title="first">
            <Selection.Item id="one">
              <TextBox>One</TextBox>
            </Selection.Item>
            <Selection.Item id="two">
              <TextBox>Two</TextBox>
            </Selection.Item>
            <Selection.Item id="three">
              <TextBox>Three</TextBox>
            </Selection.Item>
          </Selection.Section>
          <Selection.Section title="second">
            <Selection.Item id="four">
              <TextBox>Four</TextBox>
            </Selection.Item>
            <Selection.Item id="five">
              <TextBox>Five</TextBox>
            </Selection.Item>
          </Selection.Section>
        </Selection>
      </Box>
    </AppProvider>
  );
};

export const Row: Story<SelectionProps> = (args) => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} $width="20rem">
        <Selection
          row
          css={selectionStyle}
          selection={selection}
          onSelect={select}
        >
          <Selection.Section>
            <Selection.Item id="one">
              <TextBox>One</TextBox>
            </Selection.Item>
            <Selection.Item id="two">
              <TextBox>Two</TextBox>
            </Selection.Item>
            <Selection.Item id="three">
              <TextBox>Three</TextBox>
            </Selection.Item>
          </Selection.Section>
        </Selection>
      </Box>
    </AppProvider>
  );
};