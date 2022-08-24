import { useRef, useState } from "react";
import useResizeObserver from "react-resize-observer-hook";
import styled from "styled-components";

const GridDefaultProps = {
  min: "250px",
  isWide: false,
  space: "var(--space-xs)",
};

const StyledGrid = styled.div<typeof GridDefaultProps>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.space};
  grid-template-columns: ${(props) =>
    props.isWide ? `repeat(auto-fit, minmax(${props.min}, 1fr))` : "100%"};
`;

type Props = typeof GridDefaultProps & {
  children?: JSX.Element | JSX.Element[];
} & { as: string };

const Grid = ({
  min = "250px",
  isWide = false,
  space = "var(--space-xs)",
  children,
  as = "div",
}: Partial<Props>) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [state, setIsWide] = useState(isWide);

  useResizeObserver(gridRef, () => {
    const element = gridRef.current;

    if (element) {
      const test = document.createElement("div");
      test.style.width = GridDefaultProps.min;
      element.appendChild(test);
      const minToPixels = test.offsetWidth;
      element.removeChild(test);

      setIsWide(element.scrollWidth > minToPixels);
    }
  });

  const props = { min, space, as };

  return (
    <StyledGrid {...props} isWide={state} ref={gridRef}>
      {children}
    </StyledGrid>
  );
};

export default Grid;
