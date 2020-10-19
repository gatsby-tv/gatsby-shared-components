import React, { useState, useRef } from "react";
import { css } from "styled-components";

import { cssProperty, cssTextInput, cssInputBorder } from "@lib/styles";
import { ifExists, useUniqueId, useTheme } from "@lib/utilities";
import { Flex, Labelled, Connected } from "@lib/components";

// workaround: see https://github.com/styled-components/babel-plugin-styled-components/issues/240
const FlexItem = Flex.Item

export interface TextFieldProps {
  label: string;
  labelHidden?: boolean;
  id?: string;
  className?: string;
  multiline?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  align?: "left" | "center" | "right";
  help?: string;
  error?: Error;
  disabled?: boolean;
  focused?: boolean;
  clearButton?: boolean;
  onClear?: (id: string) => void;
  onChange?: (value: string, id: string) => void;
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
  onFocus?: () => void;
  onBlur?: () => void;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const theme = useTheme();
  const id = useUniqueId(props.id ? `textfield-${props.id}` : "textfield");

  const {
    className,
    label,
    labelHidden,
    multiline,
    prefix,
    suffix,
    left,
    right,
    align,
    help,
    error,
    disabled,
    focused,
    autoComplete,
    clearButton,
    onClear,
    onChange = () => undefined,
    ...inputProps
  } = props;

  const [focus, setFocus] = useState(Boolean(focused));
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

  const prefixMarkup = prefix ? (
    <FlexItem css={placeholderMarkup} shrink={0}>
      {prefix}
    </FlexItem>
  ) : null;

  const suffixMarkup = suffix ? (
    <FlexItem css={placeholderMarkup} shrink={0}>
      {suffix}
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
      ${cssProperty("text-align", align, "left")}
      outline: none;
      background-color: transparent;
    }
  `;

  return (
    <Labelled
      id={id}
      label={label}
      help={help}
      error={error}
      hidden={labelHidden}
    >
      <Connected left={left} right={right}>
        <Connected.Item>
          <Flex
            className={className}
            css={inputStyle}
            gap={theme.spacing.tight}
            align="center"
            data-focus={ifExists(focus)}
            data-error={ifExists(error)}
            paddingLeft={theme.spacing.baseTight}
            paddingRight={theme.spacing.baseTight}
            paddingTop={theme.spacing.tight}
            paddingBottom={theme.spacing.tight}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
          >
            {prefixMarkup}
            <Flex.Item
              as={multiline ? "textarea" : "input"}
              ref={input}
              id={id}
              $width={1}
              grow={1}
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
};
