import React from "react";
import Button, { type ButtonProps } from "@mui/material/Button";
import styled from "@emotion/styled";
import { CircularProgress, CircularProgressProps } from "@mui/material";

const LoadingCircularProgress = styled(CircularProgress)``;
LoadingCircularProgress.defaultProps = {
  color: "inherit",
  size: 20,
};

type LoadingButtonProps = {
  loading: boolean;
  loadingProps?: CircularProgressProps;
} & ButtonProps;

export default function ButtonProps(props: LoadingButtonProps) {
  const { loading, children, loadingProps, ...rest } = props;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (event) => {
      if (loading) return;
      rest.onClick && rest.onClick(event);
    },
    [loading, rest]
  );

  return (
    <Button {...rest} onClick={onClick} disabled={loading || props.disabled}>
      {loading && (
        <LoadingCircularProgress
          {...loadingProps}
          sx={{ ...(loadingProps ?? {}).sx, position: "absolute" }}
        />
      )}
      {children}
    </Button>
  );
}
