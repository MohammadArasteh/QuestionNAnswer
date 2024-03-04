import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import styled from "@emotion/styled";

export type FixedLabelProps = {
  title: string;
  labelProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  componentContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

export default function withFixedLabel<P>(
  WrappedComponent: React.ComponentType<P>
) {
  const displayName = WrappedComponent.displayName || "Component";

  const ComponentWithFixedLabel: React.FC<P & FixedLabelProps> = (props) => {
    const {
      containerProps,
      componentContainerProps,
      labelProps,
      title,
      ...componentProps
    } = props;
    return (
      // <WrappedComponent {...props} />
      <WrapperContainer {...containerProps}>
        <InputLabel>
          <LabelContainer {...labelProps}>{title}</LabelContainer>
        </InputLabel>
        <WrappedContainer {...componentContainerProps}>
          <WrappedComponent {...(componentProps as any)} />
        </WrappedContainer>
      </WrapperContainer>
    );
  };

  ComponentWithFixedLabel.displayName = `withFixedLabel(${displayName})`;

  return ComponentWithFixedLabel;
}

// styled components
const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedContainer = styled.div`
  margin-top: 5px;
`;
const LabelContainer = styled.div`
  color: inherit;
  font-size: 14px;
  font-weight: bold;
`;
