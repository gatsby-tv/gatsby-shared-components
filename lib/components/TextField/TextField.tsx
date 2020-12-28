import React, { useState, useRef } from "react";
import { css } from "styled-components";

import { cssProperty } from "@lib/styles/property";
import { cssTextInput } from "@lib/styles/typography";
import { cssInputBorder } from "@lib/styles/borders";
import { ifExists } from "@lib/utilities/if-exists";
import { useTheme } from "@lib/utilities/use-theme";
import { useUniqueId } from "@lib/utilities/use-unique-id";
import { Flex } from "@lib/components/Flex";
import { Labelled } from "@lib/components/Labelled";
import { Connected } from "@lib/components/Connected";

// workaround: see https://github.com/styled-components/babel-plugin-styled-components/issues/240
const FlexItem = Flex.Item;

export interface TextFieldProps {
  id?: string;
  className?: string;
  $label: string;
  $labelHidden?: boolean;
  $multiline?: boolean;
  $prefix?: React.ReactNode;
  $suffix?: React.ReactNode;
  $left?: React.ReactNode;
  $right?: React.ReactNode;
  $align?: "left" | "center" | "right";
  $help?: string;
  $error?: Error;
  $clearButton?: boolean;
  $disabled?: boolean;
  $focused?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  spellCheck?: boolean;
  maxLength?: number;
  max?: number | string;
  minLength?: number;
  min?: number | string;
  pattern?: string;
  type?: string;
  role?: string;
  onClear?: (id: string) => void;
  onChange?: (value: string, id: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function TextField(props: TextFieldProps) {
  const theme = useTheme();
  const id = useUniqueId(props.id ? `textfield-${props.id}` : "textfield");

  const {
    className,
    $label,
    $labelHidden,
    $multiline,
    $prefix,
    $suffix,
    $left,
    $right,
    $align,
    $help,
    $error,
    $clearButton,
    $disabled,
    $focused,
    autoComplete,
    onClear,
    onChange = () => undefined,
    ...inputProps
  } = props;

  const [focus, setFocus] = useState(Boolean($focused));
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value, id);
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handleClick = () => input?.current?.focus();

  const placeholderMarkup = css`
    color: ${(props) => props.theme.colors.font.body.fade(0.5)};
  `;

  const prefixMarkup = $prefix ? (
    <FlexItem css={placeholderMarkup} $shrink={0}>
      {$prefix}
    </FlexItem>
  ) : null;

  const suffixMarkup = $suffix ? (
    <FlexItem css={placeholderMarkup} $shrink={0}>
      {$suffix}
    </FlexItem>
  ) : null;

  const inputStyle = css`
    ${cssTextInput}
    ${cssInputBorder}
    cursor: text;
    border-radius: ${(props) => props.theme.border.radius.small};
    background-color: ${(props) => props.theme.colors.background[3]};

    input {
      ${cssTextInput}
      ${cssProperty("text-align", $align, "left")}
      outline: none;
      background-color: transparent;
    }
  `;

  return (
    <Labelled
      id={id}
      $label={$label}
      $help={$help}
      $error={$error}
      $hidden={$labelHidden}
    >
      {/* There is an issue with ReactNodes as props here. */}
      <Connected $left={$left as any} $right={$right as any}>
        <Connected.Item>
          <Flex
            className={className}
            css={inputStyle}
            data-focus={ifExists(focus)}
            data-error={ifExists($error)}
            $gap={theme.spacing.tight}
            $align="center"
            $paddingLeft={theme.spacing.baseTight}
            $paddingRight={theme.spacing.baseTight}
            $paddingTop={theme.spacing.tight}
            $paddingBottom={theme.spacing.tight}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
          >
            {prefixMarkup}
            <Flex.Item
              as={$multiline ? "textarea" : "input"}
              ref={input}
              id={id}
              $width={1}
              $grow={1}
              autoComplete={autoComplete ? "on" : "off"}
              onChange={handleChange}
              onKeyPress={(event: React.SyntheticEvent) =>
                event.stopPropagation()
              }
              {...inputProps}
            />
            {suffixMarkup}
          </Flex>
        </Connected.Item>
      </Connected>
    </Labelled>
  );
}
