/**
 * @Description	：index.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 20:11:31
 * @FilePath	: jira/src/components/index.tsx
 */
import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ between }) => (between ? "space-between" : undefined)};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}rem`};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${({ gap }) =>
      gap
        ? Object.is(typeof gap, "number")
          ? `${gap}rem`
          : "2rem"
        : undefined};
  }
`;
