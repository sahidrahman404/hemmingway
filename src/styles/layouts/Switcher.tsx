import PropTypes from "prop-types";
import styled from "styled-components";
import { InferPropTypes } from "../types";
import selectSpace from "../utils/selectSpace";

const SwitcherPropTypes = {
  limit: PropTypes.number,
  space: PropTypes.string,
  threshold: PropTypes.string,
};

const SwitcherDefaultProps = {
  limit: 4,
  space: "var(--space-xs)",
  threshold: "var(--measure)",
};

type SwitcherProps = InferPropTypes<
  typeof SwitcherPropTypes,
  typeof SwitcherDefaultProps
>;

const Switcher = styled.div<SwitcherProps>`
  display: block;

  > * {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    margin: calc(
      (
          ${(props) =>
              selectSpace(props.space ? props.space : "var(--space-xs)")} / 2
        ) * -1
    );
  }

  > * > * {
    flex-basis: calc(
      (
          ${(props) => props.threshold} -
            (
              100% -
                ${(props) =>
                  selectSpace(props.space ? props.space : "var(--space-xs)")}
            )
        ) * 999
    );
    margin: calc(
      ${(props) => selectSpace(props.space ? props.space : "var(--space-xs)")} /
        2
    );
    flex-grow: 1;
  }

  > * > :nth-last-child(n + ${(props) => (props.limit ? props.limit : 4 + 1)}),
  > *
    > :nth-last-child(n + ${(props) => (props.limit ? props.limit : 4 + 1)})
    ~ * {
    flex-basis: 100%;
  }
`;

Switcher.propTypes = SwitcherPropTypes;
Switcher.defaultProps = SwitcherDefaultProps;

export default Switcher;
