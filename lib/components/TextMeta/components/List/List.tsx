import React from "react";
import styled, { DefaultTheme } from "styled-components";

import { ifExists } from "@lib/utilities";
import { MetaSize } from "@lib/types";
import { cssTextMeta, cssTextSubdued } from "@lib/styles";
import { Flex } from "@lib/components";

import { Item, ItemProps } from "../Item";

type ListBaseProps = ItemProps;

const getSpacing = (theme: DefaultTheme, size?: MetaSize) => {
  if (size === "large") {
    return theme.spacing.tight;
  } else {
    return theme.spacing.extraTight;
  }
};

const ListBase = styled(Flex)<ListBaseProps>`
  & > ${Item} {
    ${(props) => ifExists(props.subdued, cssTextSubdued)}
    ${(props) => cssTextMeta(props.size ?? "medium", props.bold)}
  }

  & > ${Item}:not(:last-child):after {
    content: "•";
    margin: 0 ${(props) => getSpacing(props.theme, props.size)};
  }
`;

export interface ListProps extends ListBaseProps {
  children?: React.ReactNode;
}

export const List: React.FC<ListProps> = (props) => (
  <ListBase as="span" align="center" {...props}>
    {props.children}
  </ListBase>
);
