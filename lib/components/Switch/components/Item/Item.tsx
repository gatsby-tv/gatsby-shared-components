import React from "react";
import styled, { css } from "styled-components";

import { ifExists } from "@lib/utilities/if-exists";
import { useSwitch } from "@lib/utilities/switch";
import { Flex } from "@lib/components/Flex";

export interface ItemProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const ItemBase: React.FC<ItemProps> = (props) => {
  const { selection, onSelect } = useSwitch();
  const handleClick = () => onSelect(props.id);

  return (
    <Flex.Item
      className={props.className}
      data-selected={ifExists(selection[props.id])}
      $grow={1}
      onClick={handleClick}
    >
      <Flex $center>{props.children}</Flex>
    </Flex.Item>
  );
};

export const Item = styled(ItemBase)``;
