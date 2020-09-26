import React, { useContext } from "react";

import { ModalContext } from "../Modal";
import { Scroll } from "../Scroll";

import { CloseButton } from "./components";

import { Container } from "./Styles";

export interface PanelProps {
  children?: React.Node;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const setModal = useContext(ModalContext);

  return (
    <Container onClick={(event) => event.stopPropagation()}>
      {setModal && <CloseButton onClick={() => setModal(null)} />}
      <Scroll hidden>{props.children}</Scroll>
    </Container>
  );
};