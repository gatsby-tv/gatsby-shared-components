import React, { useRef, useState } from "react";
import { css } from "styled-components";
import type { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";

import { cssProperty } from "@app/styles";
import { ifNotExists } from "@app/utilities";
import { Portal } from "@app/components";

export interface TooltipProps {
  children?: React.ReactNode;
  $for: React.RefObject<HTMLElement>;
  fixed?: boolean;
  offset?: number;
  placement?: Placement;
  pointer?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const popper = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { styles, attributes } = usePopper(props.$for.current, popper.current, {
    placement: props.placement,
    strategy: props.fixed ? "fixed" : "absolute",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, props.offset ?? 10],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altBoundary: true,
        },
      },
      {
        name: "flip",
      },
    ],
  });

  const popperStyle = css`
    ${cssProperty("pointer-events", ifNotExists(props.pointer, "none"))}
  `;

  return (
    <Portal id="tooltip" onMount={() => setMounted(true)}>
      <div
        ref={popper}
        css={popperStyle}
        style={styles.popper}
        {...attributes.popper}
      >
        {props.children}
      </div>
    </Portal>
  );
};