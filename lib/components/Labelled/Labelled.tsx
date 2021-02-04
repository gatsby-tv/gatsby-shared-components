import React from "react";
import { css } from "styled-components";
import { NoEntry } from "@gatsby-tv/icons";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import {
  cssTextBreakWord,
  cssTextBody,
  cssTextSubdued,
  cssTextError,
  cssTextLabel,
} from "@lib/styles/typography";
import { cssVisuallyHidden } from "@lib/styles/visually-hidden";
import { cssProperty } from "@lib/styles/property";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { Optional } from "@lib/components/Optional";

export interface LabelledProps {
  children?: React.ReactNode;
  id: string;
  label: string;
  font?: string;
  help?: string;
  error?: Error;
  hidden?: boolean;
}

export function Labelled(props: LabelledProps): React.ReactElement {
  const theme = useTheme();
  const { children, id, label, font, help, error, hidden } = props;

  const helpStyle = css`
    margin-top: ${theme.spacing[0.5]};
    font-size: ${theme.font[6]};
    ${cssTextBreakWord}
    ${cssTextSubdued}
    ${cssTextLabel}
  `;

  const errorStyle = css`
    margin-top: ${theme.spacing[0.5]};
    font-size: ${theme.font[6]};
    gap: ${theme.spacing[0.5]};
    ${cssTextBreakWord}
    ${cssTextError}

    &:before {
      content: "*";
      margin-right: ${theme.spacing[0.5]};
    }
  `;

  const labelStyle = css`
    margin-bottom: ${theme.spacing[0.5]};
    ${cssProperty("font-size", font)}
    ${() => (hidden ? cssVisuallyHidden : "")}
    ${cssTextBreakWord}
    ${cssTextLabel}
  `;

  const helpMarkup = help && !error ? <Box css={helpStyle}>{help}</Box> : null;

  const errorMarkup = error ? (
    <Box css={errorStyle}>{error.message}</Box>
  ) : null;

  const errorIconMarkup = error ? (
    <Icon
      src={NoEntry}
      w={theme.icon.smaller}
      fg={theme.colors.error}
      marginBottom={theme.spacing[0.5]}
      ariaLabel="Error"
    />
  ) : null;

  return (
    <Box>
      <Optional
        active={ifExists(error)}
        component={Flex}
        $props={{ gap: theme.spacing[0.5] }}
      >
        <Box as="label" htmlFor={id} hidden={hidden} css={labelStyle}>
          {label}
        </Box>
        {errorIconMarkup}
      </Optional>
      {children}
      {errorMarkup}
      {helpMarkup}
    </Box>
  );
}
